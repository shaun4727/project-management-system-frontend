import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
	const token = request.cookies.get('mpms_token')?.value;
	const { pathname } = request.nextUrl;

	// Define routes that are meant for unauthenticated users
	// Since login is at the root, we check for exact match of '/'
	const isAuthRoute = pathname === '/login' || pathname.startsWith('/register');

	// 1. Unauthenticated users trying to access ANY protected route
	if (!token && !isAuthRoute) {
		// Redirect them back to the root (login page)
		return NextResponse.redirect(new URL('/login', request.url));
	}

	// 2. Authenticated users trying to access the login/register pages
	if (token && isAuthRoute) {
		// Redirect them straight into the app
		return NextResponse.redirect(new URL('/', request.url));
	}

	// 3. Allow request to proceed (authenticated user on protected route, or unauthenticated on auth route)
	return NextResponse.next();
}

// Config: Run on ALL paths EXCEPT static files and internal Next.js APIs
export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - public folder assets (e.g. avatar.jpg)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
	],
};
