import { AnimatedContainer } from '@/components/shared/animatedContainer';
import { CreateTaskModal } from '@/features/tasks/components/create-task-modal';

// SERVER COMPONENT
export default async function TasksPage() {
	// Server-side fetching logic goes here

	return (
		<AnimatedContainer className="max-w-[1600px] mx-auto p-6">
			<div className="flex items-center justify-between mb-8">
				<div>
					<h1 className="text-2xl font-bold text-slate-900 tracking-tight">Active Sprint</h1>
					<p className="text-sm text-slate-500 mt-1">Manage and create tasks.</p>
				</div>

				{/* The Client Modal is mounted here, but the page remains a Server Component */}
				<CreateTaskModal />
			</div>

			{/* ... Rest of the Kanban Board ... */}
			<div className="h-[500px] border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center text-slate-400">
				Kanban Board Area
			</div>
		</AnimatedContainer>
	);
}
