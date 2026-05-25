'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function createUserAction(prevState: any, formData: FormData) {
	const name = formData.get('name') as string;
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;
	const role = formData.get('role') as string;

	const cookieStore = await cookies();
	const token = cookieStore.get('mpms_token')?.value;

	try {
		// Replace with your actual backend route for creating users
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				...(token ? { Authorization: `Bearer ${token}` } : {}),
			},
			body: JSON.stringify({ name, email, password, role }),
		});

		const data = await res.json();

		if (!res.ok) {
			return { error: data.message || 'Failed to create user', success: false };
		}

		revalidatePath('/team');
		return { success: true, message: 'User created successfully!', clearForm: Math.random() };
	} catch (error) {
		return { error: 'Network error.', success: false };
	}
}

export async function getUsersAction() {
	const cookieStore = await cookies();
	const token = cookieStore.get('mpms_token')?.value;

	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				...(token ? { Authorization: `Bearer ${token}` } : {}),
			},
			// Revalidate this fetch request when a new user is created
			next: { tags: ['users'] },
		});

		const data = await res.json();

		if (!res.ok) {
			return { success: false, error: data.message || 'Failed to fetch users' };
		}

		return { success: true, data: data.data };
	} catch (error) {
		return { success: false, error: 'Network error while fetching users.' };
	}
}

export async function updateUserAction(userId: string, prevState: any, formData: FormData) {
	const name = formData.get('name') as string;
	const email = formData.get('email') as string;
	const role = formData.get('role') as string;
	const department = formData.get('department') as string;

	// 1. Get the raw comma-separated string
	const rawSkills = formData.get('skills') as string;

	// 2. Convert to an array, trim whitespace, and remove empty strings
	const skills = rawSkills
		? rawSkills
				.split(',')
				.map((s) => s.trim())
				.filter(Boolean)
		: [];

	const cookieStore = await cookies();
	const token = cookieStore.get('mpms_token')?.value;

	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				...(token ? { Authorization: `Bearer ${token}` } : {}),
			},
			// 3. Send 'skills' as an array
			body: JSON.stringify({ name, email, role, skills, department }),
		});

		const data = await res.json();

		if (!res.ok) {
			return { error: data.message || 'Failed to update user', success: false };
		}

		revalidatePath('/team');
		return { success: true, message: 'User updated successfully!', closeForm: Math.random() };
	} catch (error) {
		return { error: 'Network error.', success: false };
	}
}
