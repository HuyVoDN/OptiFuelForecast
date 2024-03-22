import { db } from '../db.js';
import PricingModule from '../pricingModule.js';
// lets do bare min for now, so we'll only calculate the price based off in state vs out of state
// if out of state we'll increase 10%, in state we reduce by 5%
// if a isRepeatCustomer == true ( the user's fuelQuote count is >= 1) we'll reduce by 10%

export const getFuelQuotes = async (req, res) => {
    const query = `
        SELECT q.* FROM OptiFuelForecast.Quotes q
        JOIN OptiFuelForecast.Users u ON q.id_user = u.id_user
        WHERE u.username = ?`;
    db.query(query, [req.params.username], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error in server");
        }
        return res.status(200).json({result});
        
    });
};
export const createFuelQuote = async (req, res) => {
    const { address, city, state, zipcode, date, gallonsRequested } = req.body;
    if (!address || !city || !state || !zipcode || !date || !gallonsRequested) {
        return res.status(400).json("Missing required fields");
    }
    try {
        const isOutOfState = state.toLowerCase() !== 'tx';
        const isRepeatedCustomerQuery = `
                    SELECT COUNT(*) as count 
                    FROM OptiFuelForecast.Quotes q
                    JOIN OptiFuelForecast.Users u ON q.id_user = u.id_user
                    WHERE u.username = ? `; // if q.id_user == null then its a new customer from count = 0 and we cant join the tables
        db.query(isRepeatedCustomerQuery, [req.params.username], (error, result) => {
            if (error) {
                throw error;
            }

            const isRepeatedCustomer = result[0].count >= 1; // true or false for if the user is new or not
            const pricingModule = new PricingModule(gallonsRequested, 0, 0, 0, isOutOfState, isRepeatedCustomer);
            const price = pricingModule.calculatePrice();

            const userIdQuery = "SELECT id_user FROM OptiFuelForecast.Users WHERE username = ?"; // query for user_id to insert it into our quote table when we create a new fuel quote
            db.query(userIdQuery, [req.params.username], (error, result) => 
            {
                if (error) 
                {
                    throw error;
                }

                const userId = result[0].id_user;
                const newFuelQuote = [userId, address, city, state, zipcode, date, gallonsRequested, price.suggestedPricePerGallon , price.totalAmountDue];
                const query = "INSERT INTO OptiFuelForecast.Quotes (`id_user`, `address`, `city`, `state`, `zipcode`, `date`, `gallonsRequested`, `suggestedPrice`, `totalAmountDue`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
                db.query(query, newFuelQuote, (error, result) => 
                {
                    if (error) 
                    {
                        throw error;
                    }
                    return res.status(201).json("Fuel Quote has been created successfully");
                });
            });
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Error in server");
    }
};