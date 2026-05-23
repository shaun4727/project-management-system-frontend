'use server';

import { revalidatePath } from 'next/cache';
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

export async function createProjectAction(prevState: any, formData: FormData) {
	const cookieStore = await cookies();
	const token = cookieStore.get('mpms_token')?.value;

	// 1. Extract and format data from FormData
	const payload = {
		title: formData.get('title'),
		client: formData.get('client'),
		description: formData.get('description'),
		startDate: formData.get('startDate'),
		endDate: formData.get('endDate'),
		budget: formData.get('budget'),
		status: formData.get('status'),
	};

	try {
		// 2. Send POST request to Express Backend
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				...(token ? { Authorization: `Bearer ${token}` } : {}),
			},
			body: JSON.stringify(payload),
		});

		const data = await res.json();

		if (!res.ok) {
			return { error: data.message || 'Failed to create project.', success: false };
		}

		// 3. Invalidate the projects cache so the new project appears instantly
		revalidatePath('/projects');
		revalidatePath('/'); // Revalidate dashboard summary too

		return { success: true, message: 'Project created successfully!' };
	} catch (error) {
		return { error: 'Network error. Could not connect to server.', success: false };
	}
}
