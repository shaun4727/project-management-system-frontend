'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// Notice we bind the taskId to this action in the component
export async function addCommentAction(taskId: string, prevState: any, formData: FormData) {
	const content = formData.get('content') as string;

	if (!content || !content.trim()) {
		return { error: 'Comment cannot be empty', success: false };
	}

	const cookieStore = await cookies();
	const token = cookieStore.get('mpms_token')?.value;

	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/comments/${taskId}/comments`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				...(token ? { Authorization: `Bearer ${token}` } : {}),
			},
			body: JSON.stringify({ content }),
		});

		const data = await res.json();

		if (!res.ok) {
			return { error: data.message || 'Failed to post comment', success: false };
		}

		// Instantly refresh the page to show the new comment!
		revalidatePath(`/tasks/${taskId}`);
		return { success: true, message: 'Comment posted!', clearForm: Math.random() };
	} catch (error) {
		return { error: 'Network error. Failed to post comment.', success: false };
	}
}

export async function fetchCommentAction(taskId: string) {
	const cookieStore = await cookies();
	const token = cookieStore.get('mpms_token')?.value;

	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/comments/${taskId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				...(token ? { Authorization: `Bearer ${token}` } : {}),
			},
		});

		const data = await res.json();

		if (!res.ok) {
			return { error: data.message || 'Failed to post comment', success: false };
		}

		return { success: true, message: 'Comment fetched!', data };
	} catch (error) {
		return { error: 'Network error. Failed to post comment.', success: false };
	}
}
