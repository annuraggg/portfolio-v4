import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await context.params;
    
    // Redirect to the main ratings endpoint which returns stats
    const response = await fetch(
      new URL(`/api/ratings/${projectId}`, request.url).toString()
    );
    
    return NextResponse.json(await response.json(), { status: response.status });
  } catch (error) {
    console.error('Error fetching rating stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
