import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
	const token = request.cookies.get('mpms_token')?.value;
	const { pathname } = request.nextUrl;

	const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register');
	const isProtectedRoute =
		pathname.startsWith('/dashboard') || pathname.startsWith('/projects') || pathname.startsWith('/tasks');

	// If trying to access a protected route without a token, redirect to login
	if (isProtectedRoute && !token) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	// If logged in and trying to access login page, redirect to dashboard
	if (isAuthRoute && token) {
		return NextResponse.redirect(new URL('/dashboard', request.url));
	}

	return NextResponse.next();
}

// Specify which routes this middleware should run on
export const config = {
	matcher: ['/dashboard/:path*', '/projects/:path*', '/tasks/:path*', '/login', '/register'],
};
