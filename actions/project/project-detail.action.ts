'use server';

import { cookies } from 'next/headers';

export async function fetchProjectDetails(projectId: string) {
	const cookieStore = await cookies();
	const token = cookieStore.get('mpms_token')?.value;

	const headers = {
		'Content-Type': 'application/json',
		...(token ? { Authorization: `Bearer ${token}` } : {}),
	};

	const baseUrl = process.env.NEXT_PUBLIC_API_URL;

	try {
		// Fetch Project, Analytics, and Activity concurrently for maximum performance
		const [projectRes, analyticsRes, activityRes] = await Promise.all([
			fetch(`${baseUrl}/api/v1/projects/${projectId}`, { headers, cache: 'no-store' }),
			fetch(`${baseUrl}/api/v1/projects/${projectId}/analytics`, { headers, cache: 'no-store' }),
			fetch(`${baseUrl}/api/v1/activities/${projectId}`, { headers, cache: 'no-store' }),
		]);

		// If the main project fetch fails (e.g., 404), throw an error
		if (!projectRes.ok) {
			const errorText = await projectRes.text();
			throw new Error(`Failed to fetch project: ${projectRes.status} - ${errorText}`);
		}

		// Parse JSON responses safely
		const projectData = await projectRes.json();
		const analyticsData = analyticsRes.ok ? await analyticsRes.json() : { data: null };
		const activityData = activityRes.ok ? await activityRes.json() : { data: [] };

		return {
			project: projectData.data,
			analytics: analyticsData.data,
			activities: activityData.data,
		};
	} catch (error) {
		console.error('--- PROJECT DETAILS FETCH ERROR ---');
		console.error(error);
		throw error;
	}
}
