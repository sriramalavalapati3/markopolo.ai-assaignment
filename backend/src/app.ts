import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import  {errorHandler}  from './modules/application/errorHandler.js';
import { UploadRouter } from './modules/upload/rest-api/upload-router.js';

dotenv.config();

const app = express();
const fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileName);
const Port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.use('/image', new UploadRouter().router);
app.listen(Port, async() => {
  try {
    console.log(`Server is running on port ${Port}`);
  } catch (error) {
    console.error('Failed to start server:', error);
  }
  
});