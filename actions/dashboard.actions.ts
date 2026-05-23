'use server';

import { DashboardSummaryResponse } from '@/features/dashboard/types/types';
import { cookies } from 'next/headers';

export async function fetchDashboardSummary(): Promise<DashboardSummaryResponse> {
	// 1. Get the JWT token from cookies securely on the server
	const cookieStore = await cookies();
	const token = cookieStore.get('mpms_token')?.value;

	// 2. Call the Express API
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard/summary`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			...(token ? { Authorization: `Bearer ${token}` } : {}),
		},
		// Cache the data for 30 seconds, or use 'no-store' for strictly real-time
		next: { revalidate: 30 },
	});

	if (!res.ok) {
		throw new Error('Failed to fetch dashboard summary');
	}

	return res.json();
}
