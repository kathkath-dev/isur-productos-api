const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME || 'isur_productos',
  user: process.env.DB_USER || 'isur_user',
  password: process.env.DB_PASSWORD || 'isur_password'
});

module.exports = pool;
