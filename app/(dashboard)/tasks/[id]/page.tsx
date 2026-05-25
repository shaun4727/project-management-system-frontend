import { AnimatedContainer } from '@/components/shared/animatedContainer';
import { TaskDetailsView } from '@/features/tasks/components/task-details-view';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

export default async function SingleTaskPage({
	params,
}: {
	params: Promise<{ id: string }>; // Type it as a Promise
}) {
	const { id } = await params;
	const cookieStore = await cookies();
	const token = cookieStore.get('mpms_token')?.value;

	try {
		// Fetch the single task from your Express API
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/tasks/${id}`, {
			headers: {
				'Content-Type': 'application/json',
				...(token ? { Authorization: `Bearer ${token}` } : {}),
			},
			next: { tags: ['tasks', `task-${id}`] },
		});

		if (!res.ok) return notFound();

		const { data: task } = await res.json();

		// Map your backend Prisma data to match the UI component's expected format
		const formattedTask = {
			id: task.id,
			title: task.title,
			description: task.description || 'No description provided.',
			status: task.status,
			priority: task.priority,
			sprint: task.sprint?.title || 'Backlog',
			estimatedHours: task.estimateHours || 0,
			loggedHours: 0, // Calculate this if you have time logs in DB
			assignees:
				task.assignees?.map((a: any) => ({
					id: a.id,
					name: a.name,
					initials: a.name
						.split(' ')
						.map((n: string) => n[0])
						.join('')
						.toUpperCase(),
				})) || [],
			subtasks: [], // Map real subtasks if your DB has them
			comments: [], // Map real comments if your DB has them
			timeLogs: [], // Map real time logs if your DB has them
		};

		return (
			<AnimatedContainer className="max-w-[1400px] mx-auto p-4 sm:p-6 h-full">
				{/* Utilize your existing component wrapper */}
				<TaskDetailsView task={formattedTask} />
			</AnimatedContainer>
		);
	} catch (error) {
		console.error(error);
		return <div className="p-8 text-center text-slate-500">Failed to load task details.</div>;
	}
}
