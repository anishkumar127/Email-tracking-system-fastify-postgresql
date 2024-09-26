const { Pool } = require('pg');

// Configure your PostgreSQL connection details here
const pool = new Pool({
  user: 'anish',        // PostgreSQL username
  host: 'localhost',        // Database host
  database: 'anish', // Database name
  password: 'anish', // Password for PostgreSQL user
  port: 5432,               // Default PostgreSQL port
});

module.exports = pool;
