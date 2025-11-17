import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await context.params;
    
    const url = new URL(request.url);
    const baseUrl = `${url.protocol}//${url.host}`;
    const response = await fetch(
      `${baseUrl}/api/ratings/${projectId}`,
      {
        method: 'GET',
        headers: request.headers,
      }
    );
    
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error fetching rating stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
