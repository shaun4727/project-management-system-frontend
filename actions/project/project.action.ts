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

export async function saveProjectAction(prevState: any, formData: FormData) {
	const cookieStore = await cookies();
	const token = cookieStore.get('mpms_token')?.value;

	const projectId = formData.get('id') as string;
	const isEditing = !!projectId;

	// 1. Extract raw strings
	const budgetRaw = formData.get('budget');
	const descriptionRaw = formData.get('description');
	const startDateRaw = formData.get('startDate') as string;
	const endDateRaw = formData.get('endDate') as string;

	// 2. Format Dates to ISO 8601 (e.g., "2026-06-01T00:00:00.000Z")
	const formattedStartDate = startDateRaw ? new Date(startDateRaw).toISOString() : null;
	const formattedEndDate = endDateRaw ? new Date(endDateRaw).toISOString() : null;

	// 3. Construct the strictly typed payload
	const payload = {
		title: formData.get('title'),
		client: formData.get('client'),
		description: descriptionRaw ? descriptionRaw : null,
		startDate: formattedStartDate, // Now formatted correctly!
		endDate: formattedEndDate, // Now formatted correctly!
		budget: budgetRaw ? Number(budgetRaw) : null,
		status: formData.get('status'),
	};

	const url = isEditing
		? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/${projectId}`
		: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects`;

	try {
		const res = await fetch(url, {
			method: isEditing ? 'PATCH' : 'POST',
			headers: {
				'Content-Type': 'application/json',
				...(token ? { Authorization: `Bearer ${token}` } : {}),
			},
			body: JSON.stringify(payload),
		});

		const data = await res.json();

		if (!res.ok) {
			return { error: data.message || `Failed to ${isEditing ? 'update' : 'create'} project.`, success: false };
		}

		revalidatePath('/projects');
		return { success: true, message: `Project ${isEditing ? 'updated' : 'created'} successfully!` };
	} catch (error) {
		return { error: 'Network error. Could not connect to server.', success: false };
	}
}

// Action for Deleting
export async function deleteProjectAction(projectId: string) {
	const cookieStore = await cookies();
	const token = cookieStore.get('mpms_token')?.value;

	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/${projectId}`, {
			method: 'DELETE',
			headers: {
				...(token ? { Authorization: `Bearer ${token}` } : {}),
			},
		});

		if (!res.ok) throw new Error('Failed to delete');

		revalidatePath('/projects');
		return { success: true };
	} catch (error) {
		console.error('Delete error:', error);
		return { success: false, error: 'Failed to delete project.' };
	}
}

export async function exportProjectTasksCsvAction(projectId: string) {
	const cookieStore = await cookies();
	const token = cookieStore.get('mpms_token')?.value;

	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/${projectId}/export/tasks`, {
			method: 'GET', // CSV exports are typically GET requests
			headers: {
				...(token ? { Authorization: `Bearer ${token}` } : {}),
			},
		});

		if (!res.ok) {
			// Try to parse error message if backend returns JSON on fail
			const errorData = await res.json().catch(() => ({}));
			return { success: false, error: errorData.message || 'Failed to export CSV' };
		}

		// CSV data is returned as plain text, not JSON
		const csvText = await res.text();

		// Attempt to extract the filename from the backend's headers (if provided)
		const contentDisposition = res.headers.get('Content-Disposition');
		let filename = `project-${projectId}-tasks.csv`;

		if (contentDisposition && contentDisposition.includes('filename=')) {
			const match = contentDisposition.match(/filename="?([^"]+)"?/);
			if (match && match[1]) {
				filename = match[1];
			}
		}

		return { success: true, data: csvText, filename };
	} catch (error) {
		console.error('Export CSV Error:', error);
		return { success: false, error: 'Network error occurred while exporting.' };
	}
}
