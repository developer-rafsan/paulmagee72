# Paule Backend

A Node.js backend server with MySQL database connection.

## Prerequisites

- Node.js installed
- MySQL server installed and running
- MySQL database named 'paule_db' created

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create MySQL database:
```sql
CREATE DATABASE paule_db;
```

3. Update database configuration:
   - Open `index.js`
   - Update the database connection details (host, user, password) according to your MySQL setup

## Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on port 3000 by default.

## API Endpoints

- GET `/`: Welcome message 