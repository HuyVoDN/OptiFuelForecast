// import express from "express";
// import {getFuelQuotes, createFuelQuote} from "../controllers/quoteController.js";
const express = require("express");
const {getFuelQuotes, createFuelQuote, calculateFuelQuote} = require("../controllers/quoteController.js");

const router = express.Router();
router.get(`/:username`, getFuelQuotes);
router.post(`/:username`, createFuelQuote);
router.post(`/:username/calculate`, calculateFuelQuote);

module.exports = router; 
