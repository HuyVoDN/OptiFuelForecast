const {db, closeConnection} = require("../db.js");

const userData = async (req, res) => {
    const getUserByUsername = (username) => {
        const query = "SELECT * FROM OptiFuelForecast.Users WHERE username = ?";
        return new Promise((resolve, reject) => {
            db.query(query, [username], (error, result) => {
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
        const user = await getUserByUsername(req.params.username);
        if (!user) {
            return res.status(404).json("User does not exist");
        }
        return res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Error in server");
    }
};

const userUpdater = async (req, res) => {
    const getUserByUsername = (username) => {
        const query = "SELECT * FROM OptiFuelForecast.Users WHERE username = ?";
        return new Promise((resolve, reject) => {
            db.query(query, [username], (error, result) => {
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
        const user = await getUserByUsername(req.params.username);
        if (!user) {
            return res.status(404).json("User does not exist");
        }

        const { firstName, lastName, address1, address2, city, state, zipcode } = req.body;
        const query = "UPDATE OptiFuelForecast.Users SET firstname = ?, lastname = ?, address1 = ?, address2 = ?, city = ?, state = ?, zipcode = ? WHERE username = ?";
        db.query(query, [firstName, lastName, address1, address2, city, state, zipcode, req.params.username], (error, result) => {
            if (error) {
                throw error;
            }
            return res.status(200).json("User has been updated successfully.");
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Error in server");
    }
};

module.exports = { userData, userUpdater };