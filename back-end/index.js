import express from 'express';
import cors from 'cors';
import {db} from './db.js';

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3000, () => 
console.log('Server is running on port 3000'),
);

db.connect((error) => {
  if(error)
  {
      console.error("Error connecting to the database: " + error);
  }
  else
  {
      console.log("Connected to the database!");
  }
});

app.get('/', (req, res) => {
  res.send('Hello World');
});