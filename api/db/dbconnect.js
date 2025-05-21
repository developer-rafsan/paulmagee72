import mysql from 'mysql2'

// Database connection
export const db = mysql.createConnection({
    host: '194.59.164.23',
    user: 'u445844004_kyYMT',
    password: 'fYbLmhVnCD',
    database: 'u445844004_GP8E6'
}).promise();

// Connect to database
export const dbconnect = db.connect()
    .then(() => console.log('Connected to MySQL database'))
    .catch(err => console.error('Error connecting to the database:', err));