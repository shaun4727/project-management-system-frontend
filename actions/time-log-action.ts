'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function logTimeAction(taskId: string, prevState: any, formData: FormData) {
	// Extract and format the payload according to your backend requirements
	const hoursLogged = Number(formData.get('hoursLogged'));
	const description = formData.get('description') as string;

	// Basic Validation
	if (!hoursLogged || hoursLogged <= 0) {
		return { error: 'Please enter a valid number of hours', success: false };
	}
	if (!description || !description.trim()) {
		return { error: 'Description is required', success: false };
	}

	const cookieStore = await cookies();
	const token = cookieStore.get('mpms_token')?.value;

	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/tasks/${taskId}/time`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				...(token ? { Authorization: `Bearer ${token}` } : {}),
			},
			body: JSON.stringify({ hoursLogged, description }),
		});

		const data = await res.json();

		if (!res.ok) {
			return { error: data.message || 'Failed to log time', success: false };
		}

		// Trigger a background refresh of the page data
		revalidatePath(`/tasks/${taskId}`);
		return { success: true, message: 'Time logged successfully!', clearForm: Math.random() };
	} catch (error) {
		return { error: 'Network error. Failed to log time.', success: false };
	}
}

export async function fetchTimeLogsAction(taskId: string) {
	const cookieStore = await cookies();
	const token = cookieStore.get('mpms_token')?.value;

	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/tasks/${taskId}/time`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				...(token ? { Authorization: `Bearer ${token}` } : {}),
			},
		});

		const data = await res.json();

		if (!res.ok) {
			return { error: data.message || 'Failed to fetch time logs', success: false };
		}

		return { success: true, data: data.data };
	} catch (error) {
		return { error: 'Network error.', success: false };
	}
}
