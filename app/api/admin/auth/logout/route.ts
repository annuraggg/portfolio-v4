/**
 * API Route: POST /api/admin/auth/logout
 * Handles admin logout
 */

import { NextResponse } from 'next/server';
import { deleteSessionCookie } from '@/lib/auth/session';

export async function POST() {
  try {
    await deleteSessionCookie();

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'An error occurred during logout' },
      { status: 500 }
    );
  }
}
