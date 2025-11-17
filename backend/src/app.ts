import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const Port = process.env.PORT || 8080;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});