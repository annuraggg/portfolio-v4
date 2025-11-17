/**
 * API Route: GET /api/credentials
 * Returns all credentials from the database
 */

import { NextResponse } from 'next/server';
import { getAllCredentials } from '@/lib/db/credentials';

export async function GET() {
  try {
    const credentials = await getAllCredentials();
    return NextResponse.json(credentials);
  } catch (error) {
    console.error('Error fetching credentials:', error);
    return NextResponse.json(
      { error: 'Failed to fetch credentials' },
      { status: 500 }
    );
  }
}
