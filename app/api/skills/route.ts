/**
 * API Route: GET /api/skills
 * Returns all skills from the database
 */

import { NextResponse } from 'next/server';
import { getAllSkills } from '@/lib/db/skills';

// Revalidate every 60 seconds for better performance
export const revalidate = 60;

export async function GET() {
  try {
    const skills = await getAllSkills();
    return NextResponse.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
}
