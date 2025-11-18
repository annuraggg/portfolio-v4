/**
 * API Route: GET /api/experience
 * Returns all experience entries from the database
 */

import { NextResponse } from 'next/server';
import { getAllExperience } from '@/lib/db/experience';

// Revalidate every 60 seconds for better performance
export const revalidate = 60;

export async function GET() {
  try {
    const experience = await getAllExperience();
    return NextResponse.json(experience);
  } catch (error) {
    console.error('Error fetching experience:', error);
    return NextResponse.json(
      { error: 'Failed to fetch experience' },
      { status: 500 }
    );
  }
}
