import { db } from '../db.js';
import PricingModule from '../pricingModule.js'; 
// lets do bare min for now, so we'll only calculate the price based off in state vs out of state
// if out of state we'll increase 10%, in state we reduce by 5%
// if a isRepeatCustomer == true ( the user's fuelQuote count is >= 1) we'll reduce by 10%

export const fuelQuoteData = async (req, res) => {
    const { locationFactor, rateHistoryFactor, fuelAmountRequested, isOutOfState, isRepeatCustomer } = req.body;
    if(!locationFactor || !rateHistoryFactor || !fuelAmountRequested || isOutOfState === undefined || isRepeatCustomer === undefined){
        return res.status(400).json("Missing required fields");
    }

    try {
            // create the fuel quote queries
            // 1.one get method to get all the fuel quote for the Fuel Quote History
            // 2.one post method to create a new fuel quote for the Fuel Quote Form
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).send("Error in server");
    }
};