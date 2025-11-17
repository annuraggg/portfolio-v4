import { NextRequest, NextResponse } from 'next/server';
import { getD1Database } from '@/lib/db/d1-client';

export const runtime = 'edge';

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

    try {
      const db = getD1Database();
      
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
  } catch (error) {
    console.error('Error checking rating:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
