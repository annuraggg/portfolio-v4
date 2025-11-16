import { NextRequest, NextResponse } from 'next/server';

// This is a mock implementation for D1 database
// In production, you would use Cloudflare Workers with D1 bindings
// For Next.js deployment, you'll need to use Cloudflare Pages Functions
const mockDb: Map<string, { ratings: Array<{ rating: number; userIdentifier: string }> }> = new Map();

interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(): Promise<T | null>;
  run(): Promise<D1Result>;
}

interface D1Result {
  success: boolean;
  meta: {
    changes: number;
    last_row_id: number;
  };
}

async function getDb(): Promise<D1Database | null> {
  // Check if running on Cloudflare Pages
  // @ts-expect-error - Cloudflare Pages runtime
  if (typeof globalThis.DB !== 'undefined') {
    // @ts-expect-error - Cloudflare Pages runtime
    return globalThis.DB as D1Database;
  }
  
  // Return null for local development - we'll use mock data
  return null;
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await context.params;
    const body = await request.json();
    const { rating, userIdentifier } = body;

    // Validate input
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

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
        await db
          .prepare(
            'INSERT INTO ratings (project_id, rating, user_identifier) VALUES (?, ?, ?) ON CONFLICT(project_id, user_identifier) DO UPDATE SET rating = excluded.rating'
          )
          .bind(projectId, rating, userIdentifier)
          .run();

        return NextResponse.json({ success: true });
      } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json(
          { error: 'Failed to save rating' },
          { status: 500 }
        );
      }
    } else {
      // Development: Use mock data
      if (!mockDb.has(projectId)) {
        mockDb.set(projectId, { ratings: [] });
      }

      const projectData = mockDb.get(projectId)!;
      const existingIndex = projectData.ratings.findIndex(
        (r) => r.userIdentifier === userIdentifier
      );

      if (existingIndex >= 0) {
        projectData.ratings[existingIndex].rating = rating;
      } else {
        projectData.ratings.push({ rating, userIdentifier });
      }

      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error('Error submitting rating:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await context.params;
    const db = await getDb();

    if (db) {
      // Production: Use D1 database
      try {
        const result = await db
          .prepare(
            'SELECT COUNT(*) as total_ratings, AVG(rating) as average_rating FROM ratings WHERE project_id = ?'
          )
          .bind(projectId)
          .first<{ total_ratings: number; average_rating: number }>();

        if (!result || result.total_ratings === 0) {
          return NextResponse.json({
            project_id: projectId,
            total_ratings: 0,
            average_rating: 0,
          });
        }

        return NextResponse.json({
          project_id: projectId,
          total_ratings: result.total_ratings,
          average_rating: result.average_rating,
        });
      } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json(
          { error: 'Failed to fetch ratings' },
          { status: 500 }
        );
      }
    } else {
      // Development: Use mock data
      const projectData = mockDb.get(projectId);

      if (!projectData || projectData.ratings.length === 0) {
        return NextResponse.json({
          project_id: projectId,
          total_ratings: 0,
          average_rating: 0,
        });
      }

      const totalRatings = projectData.ratings.length;
      const averageRating =
        projectData.ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings;

      return NextResponse.json({
        project_id: projectId,
        total_ratings: totalRatings,
        average_rating: averageRating,
      });
    }
  } catch (error) {
    console.error('Error fetching ratings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
