import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { errorHandler } from './modules/application/errorHandler';

dotenv.config();

const app = express();
const Port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(Port, async() => {
  try {
    console.log(`Server is running on port ${Port}`);
  } catch (error) {
    console.error('Failed to start server:', error);
  }
  
});