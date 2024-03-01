import express from "express";
import {register} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);

router.get("/register", (req, res) => {
    res.send("Nice, the register route is working.");
}); //test the route

// add login and logout routes 

export default router;