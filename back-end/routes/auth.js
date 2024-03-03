import express from "express";
import {register, login} from "../controllers/authController.js";

const router = express.Router();

router.get("/register", (req, res) => {
    res.send("Nice, the register route is working.");
}); //test the route


router.post("/register", register);
router.post("/login", login);


// add login and logout routes 

export default router;