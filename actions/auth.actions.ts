'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(prevState: any, formData: FormData) {
	const email = formData.get('email');
	const password = formData.get('password');

	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		});

		const data = await res.json();

		if (!res.ok) {
			// Return the error message to the client component
			return { error: data.message || 'Invalid credentials. Please try again.' };
		}

		// Success! Securely store the JWT in an HTTP-only cookie
		const cookieStore = await cookies();
		cookieStore.set('mpms_token', data.token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			path: '/',
			maxAge: 60 * 60 * 24 * 7, // 1 week validity
		});
	} catch (error) {
		return { error: 'A network error occurred. Is the backend running?' };
	}

	// Redirect must happen OUTSIDE the try/catch block in Next.js
	redirect('/dashboard');
}
