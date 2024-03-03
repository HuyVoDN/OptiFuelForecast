import {db} from "../db.js";
import bcrypt from "bcrypt"; // for password hashing, register 
import jwt from "jsonwebtoken"; // for token generation, login

export const register = (req, res) => {
    
    // check for user existence first
    const query = "SELECT * FROM OptiFuelForecast.Users WHERE email = ?";
    db.query(query, [req.body.email], (error, result) => {

        if(error)
        {
            console.log(error);
            return res.status(500).json("Error in server");
        }
        if(result.length)
        {
            console.log("User already exists");
            return res.status(409).json("User already exists");
        }

        //password hashing
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        //Creating user, inserting into database
        const query = "INSERT INTO OptiFuelForecast.Users (`email`,`username`,`password`) VALUES (?, ?, ?)";
        const values = [req.body.email, req.body.username, hash];

        db.query(query, values, (error, result) => {
            if(error)
            {
                return res.status(500).send("Error in server");
            }
            return res.status(200).send(`User has been registered successfully.`);
        });
        
        
    });
    
};

// add login and logout functions