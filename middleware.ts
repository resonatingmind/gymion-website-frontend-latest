import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Decodes the JWT payload to get the user's role.
 * This does not verify the signature (since the secret is on the backend),
 * but it prevents simple role-spoofing via cookies/localStorage.
 */
function base64UrlDecode(str: string): string | null {
  try {
    // Replace URL-safe characters and add padding
    const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '=');
    return atob(padded);
  } catch (error) {
    return null;
  }
}

function getRoleFromToken(token: string): string | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    // In Edge Runtime, we use standard atob for base64 decoding after conversion
    const decoded = base64UrlDecode(parts[1]);
    if (!decoded) return null;

    const payload = JSON.parse(decoded);
    return payload.role ? payload.role.toLowerCase() : null;
  } catch (error) {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const jwt = request.cookies.get('jwt')?.value;
  const cookieRole = request.cookies.get('role')?.value;
  const { pathname } = request.nextUrl;

  // Extract the actual role from the JWT token for true security
  const actualRole = jwt ? getRoleFromToken(jwt) : null;

  // 1. If user is logged in (has valid token and role)...
  if (jwt && actualRole) {
    // and trying to access auth pages...
    if (pathname === '/login' || pathname === '/signup') {
      // Redirect them to their respective dashboard
      return NextResponse.redirect(new URL(`/${actualRole}`, request.url));
    }
  }

  // 2. Dashboard route protection
  const dashboardRoutes = ['/owner', '/trainer', '/member', '/admin'];
  const matchedRoute = dashboardRoutes.find(route => pathname.startsWith(route));

  if (matchedRoute) {
    // No token or token has no role? Redirect to login
    if (!jwt || !actualRole) {
      const response = NextResponse.redirect(new URL('/login', request.url));
      // Clear potentially stale cookies
      response.cookies.delete('jwt');
      response.cookies.delete('role');
      return response;
    }

    // Role mismatch?
    // Extract the role from the path (e.g., /owner/dashboard -> owner)
    const requestedRole = pathname.split('/')[1].toLowerCase();
    
    // If the user's role doesn't match the route prefix, redirect them
    if (requestedRole !== actualRole) {
      console.warn(`Access denied for ${actualRole} to ${requestedRole} route`);
      return NextResponse.redirect(new URL(`/${actualRole}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Define which paths this middleware should run on
  matcher: [
    '/',
    '/login',
    '/signup',
    '/owner/:path*',
    '/trainer/:path*',
    '/member/:path*',
    '/admin/:path*'
  ],
};
