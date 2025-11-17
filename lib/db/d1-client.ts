/**
 * D1 Database Client for Cloudflare Pages
 * Provides a unified database access for both development and production
 */

import { getRequestContext } from '@cloudflare/next-on-pages';

interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(): Promise<T | null>;
  all<T = unknown>(): Promise<D1Result<T>>;
  run(): Promise<D1ExecResult>;
}

interface D1Result<T = unknown> {
  results: T[];
  success: boolean;
  meta?: {
    duration?: number;
  };
}

interface D1ExecResult {
  success: boolean;
  meta: {
    changes: number;
    last_row_id: number;
    duration?: number;
  };
}

/**
 * Get the D1 database instance
 * Works in both development (with wrangler dev) and production (Cloudflare Pages)
 */
export function getD1Database(): D1Database {
  try {
    // Try to get the database from the request context (Cloudflare Pages runtime)
    const context = getRequestContext();
    if (context?.env?.DB) {
      return context.env.DB as D1Database;
    }
  } catch {
    // getRequestContext() throws if not in a request context
    // This is expected during build time or in non-edge environments
  }

  // Fallback: Check if DB is available in global scope (for wrangler dev)
  // @ts-expect-error - DB is injected by Cloudflare runtime
  if (typeof globalThis.DB !== 'undefined') {
    // @ts-expect-error - DB is injected by Cloudflare runtime
    return globalThis.DB as D1Database;
  }

  throw new Error(
    'D1 database is not available. Make sure you are running with wrangler dev or deployed to Cloudflare Pages with D1 binding configured.'
  );
}

export type { D1Database, D1PreparedStatement, D1Result, D1ExecResult };
