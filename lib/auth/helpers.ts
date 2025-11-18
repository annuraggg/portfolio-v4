/**
 * Helper functions for admin API routes
 */

import { NextResponse } from 'next/server';
import { getSession } from './session';

/**
 * Middleware to check if admin is authenticated
 * Returns session if authenticated, or error response if not
 */
export async function requireAuth(): Promise<{ authenticated: true; userId: number; username: string } | { authenticated: false; response: NextResponse }> {
  const session = await getSession();

  if (!session) {
    return {
      authenticated: false,
      response: NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      ),
    };
  }

  return {
    authenticated: true,
    userId: session.userId,
    username: session.username,
  };
}
