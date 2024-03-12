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

export const login = (req, res) => {

    // check if user exists thru email
    const query = "SELECT * FROM OptiFuelForecast.Users WHERE email = ?";

    db.query(query, [req.body.email], (error, result) => {
        if(error)
        {
            console.log(error);
            return res.status(500).json("Error in server");
        }
        if(!result.length)
        {
            console.log("From authController - login: User does not exist");
            return res.status(404).json("User does not exist");
        }

        // check password by decoding the hashing and comparing the password that was entered and the one in the db
        const user = result[0];
        if(bcrypt.compareSync(req.body.password, user.password))
        {
            // generate token
            const token = jwt.sign({email: user.email, username: user.username}, "secret", {expiresIn: "1h"});
           
            const decoded = jwt.decode(token);
            const decodedToken = JSON.stringify(decoded);
            const expirationTime = new Date(decoded.exp * 1000);

            res.cookie("token", token, {
                httpOnly: true,
                 sameSite: 'strict',
    
            });
            
            console.log(`User: ${user.username} has been logged in with the decoded token: [${decoded.iat}] and expires at [${expirationTime}]`);
            return res.status(200).json({message:"User has been logged in successfully", username: user.username, token: token, firstname: user.firstname, lastname: user.lastname});
        }
        else
        {   
            return res.status(401).json("Invalid password");
        }
    });
}
export const logout = (req, res) => {
    
    res.clearCookie("token", {
        httpOnly: true, 
        sameSite: 'strict',
    });
    console.log(`User has been logged out successfully. `);
    return res.status(200).json({message: "User has been logged out successfully."});
}