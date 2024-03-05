import express from "express";
import {register, login, logout} from "../controllers/authController.js";

const router = express.Router();

router.get("/register", (req, res) => {
    res.send("Nice, the register route is working.");
}); //test the route


router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// add login and logout routes 

export default router;