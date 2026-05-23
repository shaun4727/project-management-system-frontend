'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(prevState: any, formData: FormData) {
	const email = formData.get('email');
	const password = formData.get('password');

	try {
		// Construct the full URL
		const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`;

		const res = await fetch(endpoint, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		});

		const data = await res.json();

		if (!res.ok) {
			console.log('Backend rejected login:', data);
			return { error: data.message || 'Invalid credentials. Please try again.' };
		}

		const cookieStore = await cookies();
		cookieStore.set('mpms_token', data.token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			path: '/',
			maxAge: 60 * 60 * 24 * 7,
		});
	} catch (error) {
		// 2. Log the ACTUAL error causing the crash to the terminal
		console.error('--- FETCH ERROR CAUGHT ---');
		console.error(error);
		return { error: 'A network error occurred. Check server logs.' };
	}

	// Redirect must happen OUTSIDE the try/catch block
	redirect('/dashboard');
}
