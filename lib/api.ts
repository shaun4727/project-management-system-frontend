import { cookies } from 'next/headers';

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
	// 1. Asynchronously await the cookie store (Next.js 15+ requirement)
	const cookieStore = await cookies();
	const token = cookieStore.get('mpms_token')?.value;

	// 2. Prepare headers
	const headers = new Headers(options.headers);
	headers.set('Content-Type', 'application/json');

	if (token) {
		headers.set('Authorization', `Bearer ${token}`);
	}

	// 3. Execute the fetch to the Express backend
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
		...options,
		headers,
	});

	return response;
}
