import express from "express";
import {userData, userUpdater} from "../controllers/usersController.js";

const router = express.Router();
// const username = some sql statement that pull the username from the db
router.get(`/:username`, userData);
//router.get(`/:username/firstlast`, userFirstLast); // no longer needed
router.patch(`/:username`, userUpdater);
//router.post("/register", register);

export default router;