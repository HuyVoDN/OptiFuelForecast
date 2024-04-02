import express from "express";
import {getFuelQuotes, createFuelQuote, calculateFuelQuote} from "../controllers/quoteController.js";

const router = express.Router();
router.get(`/:username`, getFuelQuotes);
router.post(`/:username`, createFuelQuote);
router.post(`/:username/calculate`, calculateFuelQuote);
export default router; 