/**
 * Database Schema Initialization Script for Turso
 * 
 * This script initializes the database schema for the portfolio ratings system.
 * It can be run against either a local SQLite file or a remote Turso database.
 * 
 * Usage:
 *   npm run db:init
 * 
 * Environment Variables:
 *   TURSO_DATABASE_URL - URL to your Turso database (optional, uses local.db if not set)
 *   TURSO_AUTH_TOKEN - Authentication token for Turso (required for remote database)
 */

import { initializeSchema } from '../lib/db/turso-client';

async function main() {
  try {
    console.log('Initializing database schema...');
    await initializeSchema();
    console.log('✓ Database schema initialized successfully!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Error initializing database schema:', error);
    process.exit(1);
  }
}

main();
