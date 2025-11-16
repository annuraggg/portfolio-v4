import { NextRequest, NextResponse } from 'next/server';

// Mock database for development
const mockDb: Map<string, { ratings: Array<{ rating: number; userIdentifier: string }> }> = new Map();

async function getDb() {
  // Check if running on Cloudflare Pages
  // @ts-expect-error - Cloudflare Pages runtime
  if (typeof globalThis.DB !== 'undefined') {
    // @ts-expect-error - Cloudflare Pages runtime
    return globalThis.DB;
  }
  return null;
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await context.params;
    const { searchParams } = new URL(request.url);
    const userIdentifier = searchParams.get('userId');

    if (!userIdentifier) {
      return NextResponse.json(
        { error: 'User identifier is required' },
        { status: 400 }
      );
    }

    const db = await getDb();

    if (db) {
      // Production: Use D1 database
      try {
        const result = await db
          .prepare(
            'SELECT id FROM ratings WHERE project_id = ? AND user_identifier = ? LIMIT 1'
          )
          .bind(projectId, userIdentifier)
          .first();

        return NextResponse.json({ hasRated: !!result });
      } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json(
          { error: 'Failed to check rating' },
          { status: 500 }
        );
      }
    } else {
      // Development: Use mock data
      const projectData = mockDb.get(projectId);
      const hasRated = projectData
        ? projectData.ratings.some((r) => r.userIdentifier === userIdentifier)
        : false;

      return NextResponse.json({ hasRated });
    }
  } catch (error) {
    console.error('Error checking rating:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
