import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import { formRoute } from './api/routes/getFormData.route.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();

// Create connection pool instead of single connection
export const pool = mysql.createPool({
  host: '194.59.164.23',
  user: 'u445844004_S6j6k',
  password: '8Sf1zj9uCb',
  database: 'u445844004_pjvRz',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
}).promise();

// Test database connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Database connection pool created successfully');
    connection.release();
  } catch (error) {
    console.error('Error connecting to database:', error.message);
    process.exit(1);
  }
};

// Initialize database connection
testConnection();

// Middleware
const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};
app.use(cors(corsOpts));
app.use(express.json());
app.use("/api", formRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    pool.end((err) => {
      if (err) {
        console.error('Error closing pool:', err);
      }
      console.log('Database pool closed');
      process.exit(0);
    });
  });
});