/**
 * D1 Database Client for Cloudflare Pages
 * Provides database access through async context
 */

import { AsyncLocalStorage } from "async_hooks";

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

interface CloudflareEnv {
  DB: D1Database;
}

// Store for request context
const requestContextStore = new AsyncLocalStorage<CloudflareEnv>();

/**
 * Middleware helper to set the request context
 * Call this in your middleware.ts or API route handler
 */
export function setRequestContext(env: CloudflareEnv) {
  return requestContextStore.getStore() || env;
}

/**
 * Get the current request context
 */
export function getRequestContext(): CloudflareEnv | undefined {
  return requestContextStore.getStore();
}

/**
 * Get the D1 database instance from the current request context
 * Must be called within a request handler after context is set
 */
export function getD1Database(): D1Database {
  const context = getRequestContext();

  if (!context?.DB) {
    throw new Error(
      "D1 database is not available in the current context. " +
        "Make sure you're calling this within a request handler and have configured D1 bindings."
    );
  }

  return context.DB;
}

/**
 * Run a function with the Cloudflare environment context
 * Use this in middleware or API routes to provide context to downstream code
 */
export function withRequestContext<T>(env: CloudflareEnv, fn: () => T): T {
  return requestContextStore.run(env, fn);
}

export type {
  D1Database,
  D1PreparedStatement,
  D1Result,
  D1ExecResult,
  CloudflareEnv,
};
