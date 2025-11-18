/**
 * Authentication utilities for admin panel
 */

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-this-in-production'
);

const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export interface SessionPayload {
  userId: number;
  username: string;
  expiresAt: number;
}

/**
 * Create a new session token
 */
export async function createSession(userId: number, username: string): Promise<string> {
  const expiresAt = Date.now() + SESSION_DURATION;
  
  const token = await new SignJWT({ userId, username, expiresAt })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(new Date(expiresAt))
    .sign(JWT_SECRET);

  return token;
}

/**
 * Verify and decode a session token
 */
export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    
    if (typeof payload.userId !== 'number' || typeof payload.username !== 'string') {
      return null;
    }

    return {
      userId: payload.userId,
      username: payload.username,
      expiresAt: payload.expiresAt as number,
    };
  } catch (error) {
    console.error('Session verification failed:', error);
    return null;
  }
}

/**
 * Get the current session from cookies
 */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin-session')?.value;

  if (!token) {
    return null;
  }

  return verifySession(token);
}

/**
 * Set the session cookie
 */
export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  
  cookieStore.set('admin-session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000, // in seconds
    path: '/',
  });
}

/**
 * Delete the session cookie
 */
export async function deleteSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('admin-session');
}
