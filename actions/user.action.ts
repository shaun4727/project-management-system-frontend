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
