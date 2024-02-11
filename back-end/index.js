import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.listen(3000, () => 
console.log('Server is running on port 3000'),
);

app.get('/', (req, res) => {
  res.send('Hello World');
});