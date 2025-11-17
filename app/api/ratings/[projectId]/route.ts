import { NextRequest, NextResponse } from "next/server";
import { queryFirst, execute } from "@/lib/db/turso-client";

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
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    if (!userIdentifier) {
      return NextResponse.json(
        { error: "User identifier is required" },
        { status: 400 }
      );
    }

    try {
      await execute(
        "INSERT INTO ratings (project_id, rating, user_identifier) VALUES (?, ?, ?) ON CONFLICT(project_id, user_identifier) DO UPDATE SET rating = excluded.rating",
        [projectId, rating, userIdentifier]
      );

      return NextResponse.json({ success: true });
    } catch (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to save rating" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error submitting rating:", error);
    return NextResponse.json(
      { error: "Internal server error" },
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

    try {
      const result = await queryFirst<{
        total_ratings: number;
        average_rating: number;
      }>(
        "SELECT COUNT(*) as total_ratings, AVG(rating) as average_rating FROM ratings WHERE project_id = ?",
        [projectId]
      );

      const userRating = await queryFirst<{ rating: number }>(
        "SELECT rating FROM ratings WHERE project_id = ? AND user_identifier = ? LIMIT 1",
        [projectId, request.headers.get("user-identifier") || ""]
      );

      console.log("User Rating:", userRating);
      console.log(
        "user-identifier header:",
        request.headers.get("user-identifier")
      );

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
        user_rating: userRating ? userRating.rating : undefined,
      });
    } catch (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to fetch ratings" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error fetching ratings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
