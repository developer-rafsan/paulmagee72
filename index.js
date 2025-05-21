import express from 'express';
import cors from 'cors';
import { dbconnect } from './api/db/dbconnect.js';
import { getFormData } from './api/controllers/getFormData.controller.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(getFormData)


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});
