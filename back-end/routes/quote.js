// import express from "express";
// import {getFuelQuotes, createFuelQuote} from "../controllers/quoteController.js";
const express = require("express");
const {getFuelQuotes, createFuelQuote} = require("../controllers/quoteController.js");

const router = express.Router();
router.get(`/:username`, getFuelQuotes);
router.post(`/:username`, createFuelQuote);

module.exports = router;