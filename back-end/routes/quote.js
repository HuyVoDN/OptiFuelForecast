import express from "express";
import {fuelQuoteData} from "../controllers/quoteController.js";

const router = express.Router();
router.get(`/quote`, fuelQuoteData);
export default router; 