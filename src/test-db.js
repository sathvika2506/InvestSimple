// src/test-db.js
const db = require('./config/db');

async function testConnection() {
  try {
    const res = await db.query('SELECT NOW()');
    console.log('Database connection successful! Current time:', res.rows[0].now);
  } catch (err) {
    console.error('Database connection failed:', err);
  }
}

testConnection();