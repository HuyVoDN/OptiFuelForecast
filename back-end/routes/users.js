// import express from "express";
// import {userData, userUpdater} from "../controllers/usersController.js";

const express = require("express");
const {userData, userUpdater} = require("../controllers/usersController.js");4

const router = express.Router();

// const username = some sql statement that pull the username from the db
router.get(`/:username`, userData);
router.patch(`/:username`, userUpdater);

// export default router;
module.exports = router;