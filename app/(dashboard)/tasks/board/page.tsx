import { AnimatedContainer } from '@/components/shared/animatedContainer';
import { KanbanBoard } from '@/features/tasks/new-component/kanban-board';
import { cookies } from 'next/headers';

export default async function KanbanBoardPage() {
	const cookieStore = await cookies();
	const token = cookieStore.get('mpms_token')?.value;

	// Fetch ALL tasks to populate the board
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/tasks?limit=100`, {
		headers: {
			'Content-Type': 'application/json',
			...(token ? { Authorization: `Bearer ${token}` } : {}),
		},
		next: { tags: ['tasks'] },
	});

	const { data: tasks = [] } = res.ok ? await res.json() : {};

	// Map Prisma tasks to the Kanban Card format
	const formattedTasks = tasks.map((task: any) => ({
		id: task.id,
		title: task.title,
		priority: task.priority,
		col: task.status === 'REVIEW_REQUIRED' ? 'review' : task.status.toLowerCase().replace('_', ''), // e.g. 'TODO' -> 'todo'
		hours: `${task.estimateHours || 0}h`,
		assignee: {
			name: task.assignees?.[0]?.name || 'Unassigned',
			initials: task.assignees?.[0]?.name?.substring(0, 2).toUpperCase() || '?',
		},
	}));

	return (
		<AnimatedContainer className="max-w-[1600px] mx-auto p-4 sm:p-6">
			<div className="mb-6">
				<h1 className="text-2xl font-bold text-slate-900">Kanban Board</h1>
				<p className="text-sm text-slate-500">Drag and drop tasks to update their status.</p>
			</div>

			<KanbanBoard initialTasks={formattedTasks} />
		</AnimatedContainer>
	);
}
