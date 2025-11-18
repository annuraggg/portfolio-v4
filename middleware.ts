/**
 * Middleware to check authentication for admin routes
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySession } from '@/lib/auth/session';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow access to login page
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Check authentication for all other admin routes
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin-session')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    const session = await verifySession(token);

    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
