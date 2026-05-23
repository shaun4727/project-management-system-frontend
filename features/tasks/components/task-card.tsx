'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

interface Task {
	id: string;
	title: string;
	priority: 'HIGH' | 'MEDIUM' | 'LOW';
	assignee: { name: string; avatar?: string; initials: string };
	hours: string;
}

interface TaskCardProps {
	task: Task;
}

// DUMB COMPONENT (Used inside the Client Kanban Board)
export function TaskCard({ task }: TaskCardProps) {
	const getPriorityStyles = (priority: string) => {
		switch (priority) {
			case 'HIGH':
				return 'text-red-600 bg-red-50 border-red-100';
			case 'MEDIUM':
				return 'text-amber-600 bg-amber-50 border-amber-100';
			case 'LOW':
				return 'text-emerald-600 bg-emerald-50 border-emerald-100';
			default:
				return 'text-slate-600 bg-slate-50 border-slate-200';
		}
	};

	return (
		<div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-indigo-200 transition-all cursor-grab active:cursor-grabbing group">
			<div className="flex items-start justify-between mb-4 gap-2">
				<h4 className="text-sm font-semibold text-slate-800 leading-snug group-hover:text-indigo-700 transition-colors">
					{task.title}
				</h4>
				<Badge
					variant="outline"
					className={`text-[9px] font-bold px-2 py-0 h-5 shrink-0 ${getPriorityStyles(task.priority)}`}
				>
					{task.priority}
				</Badge>
			</div>

			<div className="flex items-center justify-between mt-2">
				<div className="flex items-center gap-2">
					<Avatar className="h-6 w-6 border border-slate-100 shadow-sm">
						{task.assignee.avatar && <AvatarImage src={task.assignee.avatar} />}
						<AvatarFallback className="bg-indigo-50 text-indigo-700 text-[10px] font-bold">
							{task.assignee.initials}
						</AvatarFallback>
					</Avatar>
					<span className="text-xs text-slate-500 font-medium hidden sm:inline-block">
						{task.assignee.name}
					</span>
				</div>

				<div className="flex items-center text-slate-400 text-xs font-semibold gap-1.5">
					<Clock className="h-3.5 w-3.5" />
					<span>{task.hours}</span>
				</div>
			</div>
		</div>
	);
}
