const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL && process.env.DATABASE_URL.includes('sslmode=require') 
    ? { rejectUnauthorized: false } 
    : false,
});

pool.on('connect', () => {
  console.log('Connected to NeonDB PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle NeonDB client', err);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
