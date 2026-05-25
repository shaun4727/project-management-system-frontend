import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Clock, Edit2, Layout, Target } from 'lucide-react';
import { TaskDetailsData } from '../types/task.types';

interface TaskHeaderProps {
	task: TaskDetailsData;
}

export function TaskHeader({ task }: TaskHeaderProps) {
	return (
		<div className="space-y-6">
			<div>
				<p className="text-xs font-semibold text-slate-500 mb-2">Task Details</p>
				<div className="flex items-center gap-3 mb-2">
					<h2 className="text-2xl font-bold text-slate-900">{task.title}</h2>
					<button className="text-slate-400 hover:text-slate-600 transition-colors">
						<Edit2 className="h-4 w-4" />
					</button>
					<Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-none shadow-none font-semibold">
						{task.status}
					</Badge>
				</div>

				{/* FIX 1: Extract string properties from the sprint object safely */}
				<div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
					<Layout className="h-4 w-4" />
					<span>{task.sprint ? `Sprint ${task.sprint.sprintNumber}: ${task.sprint.title}` : 'Backlog'}</span>
				</div>
			</div>

			<div className="flex flex-wrap items-center gap-6">
				<div className="flex items-center gap-3">
					<span className="text-sm font-medium text-slate-500">Assigned to</span>
					<div className="flex -space-x-2">
						{/* FIX 2: Safely check if assignees exist and have length before mapping */}
						{task.assignees?.length > 0 ? (
							task.assignees.slice(0, 2).map((assignee) => (
								<Avatar key={assignee.id} className="h-8 w-8 border-2 border-white shadow-sm">
									{assignee.avatarUrl && <AvatarImage src={assignee.avatarUrl} />}
									<AvatarFallback className="bg-indigo-100 text-indigo-700 text-xs font-bold">
										{assignee.initials || assignee.name?.substring(0, 2).toUpperCase()}
									</AvatarFallback>
								</Avatar>
							))
						) : (
							<span className="text-sm text-slate-400 italic ml-2">Unassigned</span>
						)}
					</div>
				</div>

				<div className="flex items-center gap-3">
					<span className="text-sm font-medium text-slate-500">Priority</span>
					<Badge variant="outline" className="text-red-600 border-red-200 bg-red-50 gap-1.5 shadow-none">
						<Target className="h-3 w-3" /> {task.priority}
					</Badge>
				</div>

				<div className="flex items-center gap-4">
					<div className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
						<Target className="h-4 w-4 text-red-500" /> {task.estimatedHours || 0}h
					</div>
					<div className="flex items-center gap-1.5 text-sm font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
						<Clock className="h-4 w-4" /> {task.loggedHours || 0}h
					</div>
				</div>
			</div>
		</div>
	);
}
