/**
 * API Route: GET /api/projects
 * Returns all projects from the database
 */

import { NextResponse } from 'next/server';
import { getAllProjects, getProjectsWithRatings } from '@/lib/db/projects';

// Revalidate every 60 seconds for better performance
export const revalidate = 60;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeRatings = searchParams.get('includeRatings') === 'true';

    const projects = includeRatings 
      ? await getProjectsWithRatings()
      : await getAllProjects();

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
