'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { getCurrentUserAction } from './auth.actions';

const formatStrictDate = (dateRaw: string | undefined | null) => {
	if (!dateRaw) return undefined;
	// If it comes from <input type="date">, it looks like "YYYY-MM-DD".
	// We forcefully append the exact midnight UTC string your backend requires.
	if (!dateRaw.includes('T')) {
		return `${dateRaw}T00:00:00.000Z`;
	}
	return new Date(dateRaw).toISOString();
};

export async function saveTaskAction(prevState: any, formData: FormData) {
	const cookieStore = await cookies();
	const token = cookieStore.get('mpms_token')?.value;

	const taskId = formData.get('id') as string;
	const isEditing = !!taskId;

	// Extract raw strings

	const dueDateRaw = formData.get('dueDate') as string;
	const sprintIdRaw = formData.get('sprintId') as string;
	const assigneeIdRaw = formData.get('assigneeId') as string;
	const descriptionRaw = formData.get('description') as string;
	const estimateHoursRaw = formData.get('estimateHours') as string;

	// Construct payload with strictly formatted dates
	const payload = {
		title: formData.get('title'),
		description: descriptionRaw || null, // Changed to null
		estimateHours: estimateHoursRaw ? Number(estimateHoursRaw) : null,
		priority: formData.get('priority') || 'MEDIUM',
		status: formData.get('status') || 'TODO',
		dueDate: formatStrictDate(dueDateRaw) || null,
		sprintId: sprintIdRaw || null, // Changed to null
		assigneeIds: assigneeIdRaw ? [assigneeIdRaw] : [],
	};

	const url = isEditing
		? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tasks/${taskId}`
		: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tasks`;

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
			return { error: data.message || `Failed to ${isEditing ? 'update' : 'create'} task.`, success: false };
		}

		revalidatePath('/tasks');
		return { success: true, message: `Task ${isEditing ? 'updated' : 'created'} successfully!` };
	} catch (error) {
		return { error: 'Failed to save task. Network error.', success: false };
	}
}

export async function patchTaskAction(taskId: string, updateData: any) {
	const cookieStore = await cookies();
	const token = cookieStore.get('mpms_token')?.value;

	// SECURITY CHECK: If someone is trying to set the status to DONE
	console.log(updateData);
	if (updateData.status === 'DONE') {
		const authRes = await getCurrentUserAction();
		const currentUser = authRes.success ? authRes.data : null;

		if (!currentUser || currentUser.role !== 'ADMIN') {
			return {
				success: false,
				error: 'Unauthorized: Only Admins can mark tasks as Done.',
			};
		}
	}

	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/tasks/${taskId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				...(token ? { Authorization: `Bearer ${token}` } : {}),
			},
			body: JSON.stringify(updateData),
		});

		if (res.ok) {
			revalidatePath('/tasks');
			return { success: true };
		}
		return { success: false, error: 'Failed to update task' };
	} catch (error) {
		return { success: false, error: 'Network error' };
	}
}

export async function deleteTaskAction(taskId: string) {
	const cookieStore = await cookies();
	const token = cookieStore.get('mpms_token')?.value;

	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/tasks/${taskId}`, {
			method: 'DELETE',
			headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
		});

		if (!res.ok) throw new Error('Failed to delete task');
		revalidatePath('/tasks');
		return { success: true };
	} catch (error) {
		return { success: false, error: 'Failed to delete task.' };
	}
}

export async function patchTaskStatusAction(taskId: string, status: string) {
	const cookieStore = await cookies();
	const token = cookieStore.get('mpms_token')?.value;

	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/tasks/${taskId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				...(token ? { Authorization: `Bearer ${token}` } : {}),
			},
			body: JSON.stringify({ status }),
		});

		if (res.ok) {
			revalidatePath('/tasks/board'); // Refresh the board in the background
			return { success: true };
		}
		return { success: false, error: 'Failed to update task' };
	} catch (error) {
		return { success: false, error: 'Network error' };
	}
}

export async function uploadAttachmentAction(taskId: string, prevState: any, formData: FormData) {
	const file = formData.get('file') as File;

	// Basic validation
	if (!file || file.size === 0) {
		return { success: false, error: 'Please select a valid file to upload.' };
	}

	// Explicitly append the taskId to the FormData payload for the backend
	formData.append('taskId', taskId);

	const cookieStore = await cookies();
	const token = cookieStore.get('mpms_token')?.value;

	try {
		// Pointing to the new unified attachments endpoint
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/attachments`, {
			method: 'POST',
			headers: {
				// Do NOT set 'Content-Type'. Fetch automatically handles multipart/form-data boundaries
				...(token ? { Authorization: `Bearer ${token}` } : {}),
			},
			body: formData, // Now contains both 'file' and 'taskId'
		});

		const data = await res.json().catch(() => ({}));

		if (!res.ok) {
			return { success: false, error: data.message || 'Failed to upload file.' };
		}

		return { success: true, message: 'File uploaded!', clearForm: Math.random() };
	} catch (error) {
		console.error('Upload error:', error);
		return { success: false, error: 'Network error occurred during upload.' };
	}
}

export async function fetchTaskDetailsAction(taskId: string) {
	const cookieStore = await cookies();
	const token = cookieStore.get('mpms_token')?.value;

	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/tasks/${taskId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				...(token ? { Authorization: `Bearer ${token}` } : {}),
			},
			// Cache control depending on your Next.js setup (optional)
			cache: 'no-store',
		});

		const data = await res.json();

		if (!res.ok) {
			return { success: false, error: data.message || 'Failed to fetch task details' };
		}

		return { success: true, data: data.data };
	} catch (error) {
		console.error('Error fetching task details:', error);
		return { success: false, error: 'Network error.' };
	}
}
