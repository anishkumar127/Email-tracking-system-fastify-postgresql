const { pgTable, serial, text, boolean, timestamp, varchar } = require('drizzle-orm/pg-core');
const { migrate } = require('drizzle-orm/node-postgres/migrator');
const { drizzle } = require('drizzle-orm/node-postgres');
const { Pool } = require('pg');

// Create a PostgreSQL pool connection
const pool = new Pool({
  user: 'anish',
  host: 'localhost',
  database: 'anish',
  password: 'anish',
  port: 5432,
});

// Initialize Drizzle with the pool
const drizzleDb = drizzle(pool);

module.exports = drizzleDb;
