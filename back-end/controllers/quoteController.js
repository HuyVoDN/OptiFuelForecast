// import { db } from '../db.js';
// import PricingModule from '../pricingModule.js';
const { db, closeConnection } = require("../db.js");
const PricingModule = require("../pricingModule.js");

const getFuelQuotes = async (req, res) => {
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

const calculateFuelQuote = async (req, res) => {
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
                    WHERE u.username = ? `; 
        db.query(isRepeatedCustomerQuery, [req.params.username], (error, result) => {
            if (error) {
                throw error;
            }

            const isRepeatedCustomer = result[0].count >= 1; 
            const pricingModule = new PricingModule(gallonsRequested, isOutOfState, isRepeatedCustomer);
            const price = pricingModule.calculatePrice();
            return res.status(200).json(price);
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Error in server");
    }
};

const createFuelQuote = async (req, res) => {
    const { address, city, state, zipcode, date, gallonsRequested, suggestedPrice, totalAmountDue } = req.body;
    if (!address || !city || !state || !zipcode || !date || !gallonsRequested) {
        return res.status(400).json("Missing required fields");
    }
    try {
        const userIdQuery = "SELECT id_user FROM OptiFuelForecast.Users WHERE username = ?";
        db.query(userIdQuery, [req.params.username], (error, result) => {
            if (error) {
                throw error;
            }
            const userId = result[0].id_user;
            const newFuelQuote = [userId, address, city, state, zipcode, date, gallonsRequested, suggestedPrice , totalAmountDue];
            const query = "INSERT INTO OptiFuelForecast.Quotes (`id_user`, `address`, `city`, `state`, `zipcode`, `date`, `gallonsRequested`, `suggestedPrice`, `totalAmountDue`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            db.query(query, newFuelQuote, (error, result) => {
                if (error) {
                    throw error;
                }
                return res.status(201).json("Fuel Quote has been created successfully");
            });
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Error in server");
    }
};

module.exports = { getFuelQuotes, createFuelQuote, calculateFuelQuote };