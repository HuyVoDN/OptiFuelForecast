import {db} from "../db.js";

const getUserByUsername = (username) => {
    const query = "SELECT * FROM OptiFuelForecast.Users WHERE username = ?";
    return new Promise((resolve, reject) => {
        db.query(query, [username], (error, result) => {
            if(error)
            {
                reject(error);
            }
            else
            {
                resolve(result[0]);
            }
         });
    });
};
export const userData = async (req, res) => {
    try {
        const user = await getUserByUsername(req.params.username);
        if(!user)
        {
            return res.status(404).json("User does not exist");
        }
        return res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Error in server");
    }
  
    
};

// this functionality is no longer needed, it was used to get the first and last name from the database
// but it is now being used from the login instead. Keep it here just in case

// export const userFirstLast = (req, res) => {
//     const { username } = req.params;
//     const query = "SELECT firstname, lastname FROM OptiFuelForecast.Users WHERE username = ?";
//     db.query( query, [username], (error, result) => {
//         if(error)
//         {
//             console.log(error);
//             return res.status(500).json("Error in server");
//         }

//         if(result.length === 0)
//         {
//             console.log("From usersController - userFirstLast: User does not exist");
//             return res.status(404).json("User does not exist");
//         }

//         // if user exists, return the user data
//         return res.status(200).json(result[0]);
//     });
    
//};
export const userUpdater = async (req, res) => {

    try 
    {
        const user = await getUserByUsername(req.params.username);
        if(!user)
        {
            return res.status(404).json("User does not exist"); 
        }

        const { firstName, lastName, address1, address2, city, state, zipcode } = req.body;
        const query = "UPDATE OptiFuelForecast.Users SET firstname = ?, lastname = ?, address1 = ?, address2 = ?, city = ?, state = ?, zipcode = ? WHERE username = ?";
        db.query(query, [firstName, lastName, address1, address2, city, state, zipcode, req.params.username], (error, result) => {
            if(error)
            {
                throw error;
            }
            return res.status(200).json("User has been updated successfully.");
        });
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).send("Error in server");
    }
};