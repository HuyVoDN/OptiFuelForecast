// import { db } from "../db.js";
// import bcrypt from "bcrypt"; // for password hashing, register 
// import jwt from "jsonwebtoken"; // for token generation, login
const db = require("../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

 const register = async (req, res) => {

    const getUserByEmail = (email) => {
        const query = "SELECT * FROM OptiFuelForecast.Users WHERE email = ?";
        return new Promise((resolve, reject) => {
            db.query(query, [email], (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result[0]);
                }
            });
        });
    };

    try {
        const user = await getUserByEmail(req.body.email);
        if (user) {
            return res.status(409).json("User already exists");
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        //Creating user, inserting into database
        const query = "INSERT INTO OptiFuelForecast.Users (`email`,`username`,`password`) VALUES (?, ?, ?)";
        const values = [req.body.email, req.body.username, hash];

        db.query(query, values, (error, result) => {
            if (error) {
                throw error;
            }
            return res.status(201).send(`User has been registered successfully.`);
        });

    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Error in server");
    }
};

 const login = async (req, res) => {

    const getUserByEmail = (email) => {
        const query = "SELECT * FROM OptiFuelForecast.Users WHERE email = ?";
        return new Promise((resolve, reject) => {
            db.query(query, [email], (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result[0]);
                }
            });
        });
    };
    
    try {
        const user = await getUserByEmail(req.body.email);
        if (!user) {
            return res.status(404).json("User does not exist");
        }

        if (bcrypt.compareSync(req.body.password, user.password)) {
            // generate token
            const token = jwt.sign({email: user.email, username: user.username}, "secret", {expiresIn: "1h"});

            const decoded = jwt.decode(token);
            const expirationTime = new Date(decoded.exp * 1000);

            res.cookie("token", token, {httpOnly: true, sameSite: 'strict'});

            console.log(`User: ${user.username} has been logged in with the decoded token: [${decoded.iat}] and expires at [${expirationTime}]`);
            return res.status(200).json({message:"User has been logged in successfully", username: user.username, token: token, firstname: user.firstname, lastname: user.lastname});
        }
        else {
            return res.status(401).json("Invalid password.");
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Error in server");
    }
}
 const logout = (req, res) => {

    res.clearCookie("token", {httpOnly: true, sameSite: 'strict',});
    console.log(`User has been logged out successfully. `);
    return res.status(200).json({ message: "User has been logged out successfully." });
}

module.exports = { register, login, logout };