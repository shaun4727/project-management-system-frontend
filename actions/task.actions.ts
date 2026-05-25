'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

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

export async function patchTaskAction(taskId: string, updates: any) {
	const cookieStore = await cookies();
	const token = cookieStore.get('mpms_token')?.value;

	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/tasks/${taskId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				...(token ? { Authorization: `Bearer ${token}` } : {}),
			},
			body: JSON.stringify(updates),
		});

		if (!res.ok) throw new Error('Failed to update task');
		revalidatePath('/tasks');
		return { success: true };
	} catch (error) {
		console.error('Patch error:', error);
		return { success: false, error: 'Update failed.' };
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
