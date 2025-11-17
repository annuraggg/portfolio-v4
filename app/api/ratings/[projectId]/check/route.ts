import { NextRequest, NextResponse } from 'next/server';
import { queryFirst } from '@/lib/db/turso-client';

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
      const result = await queryFirst(
        'SELECT id FROM ratings WHERE project_id = ? AND user_identifier = ? LIMIT 1',
        [projectId, userIdentifier]
      );

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
