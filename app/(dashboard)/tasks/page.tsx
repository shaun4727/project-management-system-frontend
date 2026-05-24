import { AnimatedContainer } from '@/components/shared/animatedContainer';
import { TaskDashboard } from '@/features/tasks/new-component/task-dashboard';
import { cookies } from 'next/headers';

export default async function TasksPage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
	const resolvedParams = await searchParams;
	const cookieStore = await cookies();
	const token = cookieStore.get('mpms_token')?.value;

	const headers = {
		'Content-Type': 'application/json',
		...(token ? { Authorization: `Bearer ${token}` } : {}),
	};

	// 1. Build Query for Tasks
	const query = new URLSearchParams();
	Object.entries(resolvedParams).forEach(([key, value]) => {
		if (value) query.append(key, value);
	});

	const baseUrl = process.env.NEXT_PUBLIC_API_URL;

	try {
		// 2. Fetch everything in parallel using native endpoints
		const [tasksRes, projectsRes, sprintsRes, usersRes] = await Promise.all([
			fetch(`${baseUrl}/api/v1/tasks?${query.toString()}`, { headers, next: { tags: ['tasks'] } }),
			fetch(`${baseUrl}/api/v1/projects`, { headers, next: { tags: ['projects'] } }),
			fetch(`${baseUrl}/api/v1/sprints`, { headers, next: { tags: ['sprints'] } }),
			fetch(`${baseUrl}/api/v1/users`, { headers, next: { tags: ['users'] } }), // <-- NEW
		]);
		// 2. Parse the responses
		const tasksData = tasksRes.ok ? await tasksRes.json() : { data: [] };
		const projectsData = projectsRes.ok ? await projectsRes.json() : { data: [] };
		const sprintsData = sprintsRes.ok ? await sprintsRes.json() : { data: [] };
		const usersData = usersRes.ok ? await usersRes.json() : { data: [] }; // <-- NEW

		// 3. Pass the users to the Client Component
		return (
			<AnimatedContainer className="max-w-[1600px] mx-auto p-4 sm:p-6">
				<TaskDashboard
					tasks={tasksData.data || []}
					projects={projectsData.data.projects || []}
					sprints={sprintsData.data || []}
					users={usersData.data || []} // <-- NEW
				/>
			</AnimatedContainer>
		);
	} catch (error) {
		console.error('Data Fetching Error:', error);

		// Fallback UI if server is unreachable
		return (
			<div className="flex items-center justify-center h-[50vh] text-slate-500">
				Failed to load tasks. Please ensure the backend is running.
			</div>
		);
	}
}
