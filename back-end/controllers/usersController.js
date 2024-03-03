import {db} from "../db.js";

export const userData = (req, res) => {
    const { username } = req.params;
    const query = "SELECT * FROM OptiFuelForecast.Users WHERE username = ?";
    db.query( query, [username], (error, result) => {
        if(error)
        {
            console.log(error);
            return res.status(500).json("Error in server");
        }

        if(result.length === 0)
        {
            console.log("User does not exist");
            return res.status(404).json("User does not exist");
        }

        // if user exists, return the user data
        return res.status(200).json(result[0]);
    });
    
    // make sql statement to pull the username so it can be called from the front end
    
};

export const userUpdater = (req, res) => {

    const { username } = req.params;
    const { firstName, lastName, address1, address2, city, state, zipcode } = req.body;
    const query = "UPDATE OptiFuelForecast.Users SET firstname = ?, lastname = ?, address1 = ?, address2 = ?, city = ?, state = ?, zipcode = ? WHERE username = ?";
    db.query(query, [firstName, lastName, address1, address2, city, state, zipcode, username], (error, result) => {
        if(error)
        {
            console.log(error);
            return res.status(500).json("Error in server");
        }
        // if user does not exist, return 404
        if(result.affectedRows === 0)
        {
            return res.status(404).json("User does not exist");
        }
        // user updated ez
        return res.status(200).json("User has been updated successfully");
    });
};