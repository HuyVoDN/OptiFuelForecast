const mysql = require('mysql2');
const { config } = require('dotenv');
config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const closeConnection = () => {
    db.end();
};

module.exports = { db, closeConnection };