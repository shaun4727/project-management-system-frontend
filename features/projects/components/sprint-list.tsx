import { Badge } from '@/components/ui/badge';

const sprints = [
	{
		id: 1,
		name: 'Sprint 1 - Setup & Planning',
		dates: 'Apr 28 - May 5',
		progress: 100,
		status: 'Completed',
		statusColor: 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100',
	},
	{
		id: 2,
		name: 'Sprint 2 - Core Development',
		dates: 'May 6 - May 19',
		progress: 62,
		status: 'Active',
		statusColor: 'bg-amber-50 text-amber-600 hover:bg-amber-100',
	},
	{
		id: 3,
		name: 'Sprint 3 - UI/UX',
		dates: 'May 20 - Jun 2',
		progress: 0,
		status: 'Upcoming',
		statusColor: 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100',
	},
	{
		id: 4,
		name: 'Sprint 4 - Testing & Bug Fixes',
		dates: 'Jun 3 - Jun 16',
		progress: 0,
		status: 'Upcoming',
		statusColor: 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100',
	},
];

// Server Component
export function SprintList() {
	return (
		<div className="space-y-4 w-full">
			{sprints.map((sprint) => (
				<div
					key={sprint.id}
					className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3 border-b border-slate-50 last:border-0"
				>
					<div className="w-full sm:w-1/3">
						<p className="text-sm font-semibold text-slate-900">{sprint.name}</p>
					</div>
					<div className="w-full sm:w-1/4">
						<p className="text-xs text-slate-500 font-medium">{sprint.dates}</p>
					</div>
					<div className="w-full sm:w-1/4 flex items-center gap-3">
						{sprint.progress > 0 ? (
							<>
								<div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
									<div
										className="h-full bg-emerald-500 rounded-full"
										style={{ width: `${sprint.progress}%` }}
									/>
								</div>
								<span className="text-xs font-semibold text-slate-600 w-10">{sprint.progress}%</span>
							</>
						) : (
							<span className="text-xs text-slate-400 font-medium italic flex-1">Not started</span>
						)}
					</div>
					<div className="w-full sm:w-auto flex justify-end">
						<Badge className={`px-2.5 py-0.5 shadow-none font-semibold ${sprint.statusColor}`}>
							{sprint.status}
						</Badge>
					</div>
				</div>
			))}
		</div>
	);
}
