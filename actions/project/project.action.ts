'use server';

import { cookies } from 'next/headers';

export async function fetchProjects(page = 1, limit = 6, status?: string) {
	const cookieStore = await cookies();
	const token = cookieStore.get('mpms_token')?.value;

	// Build the query string
	const query = new URLSearchParams({
		page: page.toString(),
		limit: limit.toString(),
		...(status && status !== 'All Projects' ? { status: status.toUpperCase() } : {}),
	});

	const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects?${query.toString()}`;

	const res = await fetch(endpoint, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			...(token ? { Authorization: `Bearer ${token}` } : {}),
		},
		// We don't cache this aggressively because project statuses change often
		cache: 'no-store',
	});

	if (!res.ok) {
		throw new Error('Failed to fetch projects');
	}

	return res.json();
}
