import { Badge } from '@/components/ui/badge';
import { SprintListProps } from '../types/project.types';

// 1. Define the shape of the data coming from your API/Prisma

// 2. Helper function to format dates (e.g., "Apr 28 - May 5")
const formatSprintDates = (start: string | Date, end: string | Date) => {
	const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });
	return `${formatter.format(new Date(start))} - ${formatter.format(new Date(end))}`;
};

// 3. Helper function to determine status and color based on dates and progress
const getSprintStatus = (progress: number, endDate: string | Date, startDate: string | Date) => {
	const now = new Date();
	const start = new Date(startDate);
	const end = new Date(endDate);

	if (progress === 100) {
		return { label: 'Completed', color: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' };
	}
	if (now >= start && now <= end) {
		return { label: 'Active', color: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100' };
	}
	if (now < start) {
		return { label: 'Upcoming', color: 'bg-slate-100 text-slate-600 hover:bg-slate-200' };
	}
	// If it's past the end date but not 100% completed
	return { label: 'Overdue', color: 'bg-red-50 text-red-700 hover:bg-red-100' };
};

// SMART SERVER COMPONENT
export function SprintList({ sprints }: SprintListProps) {
	if (!sprints || sprints.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center h-40 text-slate-400 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
				<span className="text-sm font-medium">No sprints created yet.</span>
			</div>
		);
	}

	// Sort sprints by sprint number (or start date)
	const sortedSprints = [...sprints].sort((a, b) => a.sprintNumber - b.sprintNumber);

	return (
		<div className="space-y-4 w-full">
			{sortedSprints.map((sprint) => {
				// Calculate real progress from nested tasks
				const totalTasks = sprint.tasks?.length || 0;
				const completedTasks = sprint.tasks?.filter((t) => t.status === 'DONE').length || 0;
				const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

				const statusInfo = getSprintStatus(progress, sprint.endDate, sprint.startDate);

				return (
					<div
						key={sprint.id}
						className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3 border-b border-slate-100 last:border-0"
					>
						<div className="w-full sm:w-1/3">
							<p className="text-sm font-semibold text-slate-900 truncate">
								Sprint {sprint.sprintNumber}: {sprint.title}
							</p>
						</div>
						<div className="w-full sm:w-1/4">
							<p className="text-xs text-slate-500 font-medium">
								{formatSprintDates(sprint.startDate, sprint.endDate)}
							</p>
						</div>
						<div className="w-full sm:w-1/4 flex items-center gap-3">
							{totalTasks > 0 ? (
								<>
									<div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
										<div
											className="h-full bg-indigo-500 rounded-full transition-all duration-500"
											style={{ width: `${progress}%` }}
										/>
									</div>
									<span className="text-xs font-semibold text-slate-600 w-10">{progress}%</span>
								</>
							) : (
								<span className="text-xs text-slate-400 font-medium italic flex-1">No tasks yet</span>
							)}
						</div>
						<div className="w-full sm:w-auto flex justify-end">
							<Badge className={`px-2.5 py-0.5 shadow-none font-semibold ${statusInfo.color}`}>
								{statusInfo.label}
							</Badge>
						</div>
					</div>
				);
			})}
		</div>
	);
}
