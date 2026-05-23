import { AnimatedContainer } from '@/components/shared/animatedContainer';
import { KanbanBoard } from '@/features/tasks/components/kanban-board';
import { TaskBoardFilters } from '@/features/tasks/components/task-board-filter';

// MOCK DATA: Perfectly matching the data in Image 4
const mockTasks = [
	{
		id: 't1',
		col: 'todo',
		title: 'Setup Authentication',
		priority: 'HIGH',
		assignee: { name: 'Alex Johnson', initials: 'AJ' },
		hours: '8h',
	},
	{
		id: 't2',
		col: 'todo',
		title: 'Create Landing Page',
		priority: 'MEDIUM',
		assignee: { name: 'Sarah Williams', initials: 'SW' },
		hours: '5h',
	},
	{
		id: 't3',
		col: 'todo',
		title: 'Setup Database Schema',
		priority: 'HIGH',
		assignee: { name: 'Mike Johnson', initials: 'MJ' },
		hours: '6h',
	},
	{
		id: 't4',
		col: 'inProgress',
		title: 'API Integration',
		priority: 'HIGH',
		assignee: { name: 'John Doe', initials: 'JD' },
		hours: '8h',
	},
	{
		id: 't5',
		col: 'inProgress',
		title: 'Dashboard UI',
		priority: 'MEDIUM',
		assignee: { name: 'Emma Brown', initials: 'EB' },
		hours: '5h',
	},
	{
		id: 't6',
		col: 'inProgress',
		title: 'User Management',
		priority: 'MEDIUM',
		assignee: { name: 'Alex Johnson', initials: 'AJ' },
		hours: '5h',
	},
	{
		id: 't7',
		col: 'review',
		title: 'Fix Navbar Bug',
		priority: 'LOW',
		assignee: { name: 'Sarah Williams', initials: 'SW' },
		hours: '3h',
	},
	{
		id: 't8',
		col: 'review',
		title: 'Improve UI Components',
		priority: 'MEDIUM',
		assignee: { name: 'Mike Johnson', initials: 'MJ' },
		hours: '5h',
	},
	{
		id: 't9',
		col: 'done',
		title: 'Project Setup',
		priority: 'LOW',
		assignee: { name: 'John Doe', initials: 'JD' },
		hours: '2h',
	},
	{
		id: 't10',
		col: 'done',
		title: 'Environment Config',
		priority: 'LOW',
		assignee: { name: 'Emma Brown', initials: 'EB' },
		hours: '2h',
	},
	{
		id: 't11',
		col: 'done',
		title: 'Initial Commit',
		priority: 'LOW',
		assignee: { name: 'Alex Johnson', initials: 'AJ' },
		hours: '1h',
	},
];

// SERVER COMPONENT (Smart/Container)
// Notice the route params perfectly match the breadcrumb in the image requirements
export default async function SprintBoardPage({ params }: { params: { projectId: string; sprintId: string } }) {
	// In production: Fetch sprint data and tasks from PostgreSQL via Prisma here
	// const tasks = await fetchTasksForSprint(params.sprintId);

	return (
		<AnimatedContainer
			stagger={false}
			className="h-full flex flex-col space-y-6 max-w-[1600px] mx-auto overflow-hidden"
		>
			{/* Header & Filters */}
			<div className="flex flex-col gap-6 shrink-0 gsap-item">
				<div>
					<h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight leading-tight">
						Sprint 2 - Core Development
					</h1>
					<p className="text-sm text-slate-500 mt-1 font-medium">May 6 - May 19</p>
				</div>

				{/* Client Component: Search & Filter Controls */}
				<TaskBoardFilters />
			</div>

			{/* Main Kanban Board Area */}
			<div className="flex-1 mt-2 gsap-item">
				{/* Client Component: Handles Drag and Drop physics and UI state */}
				<KanbanBoard initialTasks={mockTasks} />
			</div>
		</AnimatedContainer>
	);
}
