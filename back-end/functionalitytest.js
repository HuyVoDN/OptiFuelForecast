// test to see if database is connected, and if sql statements are correct 
// for back end

import express from 'express';
import {db} from './db.js';

const router = express.Router();

router.get('/test', (req, res) => {
  const query = "SELECT * FROM Users WHERE username = 'cyrus1'";

  db.query(query, (error, results) => {
    if (error) 
    {
      return res.status(500).json({ error: 'Error in server' });
    }
    return res.status(200).json(results);
  });
});

export default router;