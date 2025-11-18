/**
 * Initialize database schema
 */

import { initializeSchema } from '../lib/db/turso-client';

async function init() {
  console.log('Initializing database schema...');
  
  try {
    await initializeSchema();
    console.log('✓ Database schema initialized successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

init();
