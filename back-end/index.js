// import express from 'express';
// import cors from 'cors';
// import { db } from './db.js';
// import authRoutes from './routes/auth.js';
// import testRoutes from './functionalitytest.js';
// import userRoutes from './routes/users.js';
// import quoteRoutes from './routes/quote.js';
const express = require('express');
const cors = require('cors');
const { db } = require('./db.js');
const authRoutes = require('./routes/auth.js');
const testRoutes = require('./functionalitytest.js');
const userRoutes = require('./routes/users.js');
const quoteRoutes = require('./routes/quote.js');
const app = express();

app.use(cors({
  credentials: true,
  origin: ["https://optifuel-forecast.vercel.app"], 
  methods: ["GET", "POST", "PATCH"],
}));

app.use(express.json());

const server = app.listen(3000, () =>
  console.log('Server is running on port 3000'),
);

//database
db.connect((error) => {
  if (error) {
    console.error("Error connecting to the database: " + error);
  }
  else {
    console.log("Connected to the database!");
  }
});

app.get('/', (req, res) => {
  res.send('Nice, the backend is working.');
}); //test

//app.use('/fuel')
app.use('/auth', authRoutes);
app.use('/users', userRoutes); 
app.use('/', testRoutes);// testing for sql statements and db connection
app.use('/quote', quoteRoutes); //quote routes

module.exports = {app, server};