/**
 * Turso Database Client for libSQL
 * Provides database access for both remote Turso and local development
 */

import { createClient, Client, InValue } from '@libsql/client';

let dbClient: Client | null = null;

/**
 * Initialize and return the Turso database client
 * Uses environment variables for configuration
 */
export function getTursoClient(): Client {
  if (dbClient) {
    return dbClient;
  }

  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  // For local development, allow file-based SQLite
  if (!url) {
    console.warn('TURSO_DATABASE_URL not set, using local SQLite file');
    dbClient = createClient({
      url: 'file:local.db',
    });
    return dbClient;
  }

  // For remote Turso database
  dbClient = createClient({
    url,
    authToken: authToken || '',
  });

  return dbClient;
}

/**
 * Execute a query and return the first result
 */
export async function queryFirst<T = unknown>(
  sql: string,
  args: InValue[] = []
): Promise<T | null> {
  const client = getTursoClient();
  const result = await client.execute({
    sql,
    args,
  });

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0] as T;
}

/**
 * Execute a query and return all results
 */
export async function queryAll<T = unknown>(
  sql: string,
  args: InValue[] = []
): Promise<T[]> {
  const client = getTursoClient();
  const result = await client.execute({
    sql,
    args,
  });

  return result.rows as T[];
}

/**
 * Execute a query without expecting results (INSERT, UPDATE, DELETE)
 */
export async function execute(
  sql: string,
  args: InValue[] = []
): Promise<{ changes: number; lastInsertRowid: bigint | number | undefined }> {
  const client = getTursoClient();
  const result = await client.execute({
    sql,
    args,
  });

  return {
    changes: result.rowsAffected,
    lastInsertRowid: result.lastInsertRowid,
  };
}

/**
 * Initialize the database schema
 * Call this on first run or for migrations
 */
export async function initializeSchema(): Promise<void> {
  const client = getTursoClient();
  
  // Create ratings table
  await client.execute(`
    CREATE TABLE IF NOT EXISTS ratings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project_id TEXT NOT NULL,
      rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
      user_identifier TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(project_id, user_identifier)
    )
  `);

  // Create indexes
  await client.execute(`
    CREATE INDEX IF NOT EXISTS idx_project_id ON ratings(project_id)
  `);

  await client.execute(`
    CREATE INDEX IF NOT EXISTS idx_user_identifier ON ratings(project_id, user_identifier)
  `);

  console.log('Database schema initialized successfully');
}

export type { Client };
