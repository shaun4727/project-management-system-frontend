'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function saveSprintAction(prevState: any, formData: FormData) {
	const cookieStore = await cookies();
	const token = cookieStore.get('mpms_token')?.value;

	// Identify if updating or creating
	const sprintId = formData.get('id') as string;
	const isEditing = !!sprintId;

	// projectId is required for both create and update validation
	const projectId = formData.get('projectId') as string;

	// Extract raw string values
	const startDateRaw = formData.get('startDate') as string;
	const endDateRaw = formData.get('endDate') as string;
	const sprintNumberRaw = formData.get('sprintNumber') as string;

	// Type-cast the payload to strictly match your Prisma Schema
	const payload = {
		title: formData.get('title'),
		sprintNumber: sprintNumberRaw ? parseInt(sprintNumberRaw, 10) : 1,
		startDate: startDateRaw ? new Date(startDateRaw).toISOString() : null, // Converts to "2026-06-01T00:00:00.000Z"
		endDate: endDateRaw ? new Date(endDateRaw).toISOString() : null,
		projectId: projectId,
	};

	const url = isEditing
		? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/sprints/${sprintId}`
		: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/sprints`;

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
			return { error: data.message || `Failed to ${isEditing ? 'update' : 'create'} sprint.`, success: false };
		}

		// Invalidate the specific project details page so the new sprint appears instantly
		revalidatePath(`/projects/${projectId}`);

		return { success: true, message: `Sprint ${isEditing ? 'updated' : 'created'} successfully!` };
	} catch (error) {
		return { error: 'Network error. Could not connect to server.', success: false };
	}
}
