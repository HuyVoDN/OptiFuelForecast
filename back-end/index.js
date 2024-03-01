import express from 'express';
import cors from 'cors';
import { db } from './db.js';
import authRoutes from './routes/auth.js';
const app = express();

app.use(cors({
  credentials: true,
  origin: ["http://localhost:5173"],
  methods: ["GET,POST"],
})
);

app.use(express.json());

app.listen(3000, () =>
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

app.use('/auth', authRoutes);