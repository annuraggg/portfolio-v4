/**
 * API Route: GET /api/projects/[id]
 * Returns a single project by ID from the database
 */

import { NextResponse } from 'next/server';
import { getProjectById, getProjectWithRating } from '@/lib/db/projects';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const includeRating = searchParams.get('includeRating') === 'true';

    const project = includeRating 
      ? await getProjectWithRating(id)
      : await getProjectById(id);

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}
