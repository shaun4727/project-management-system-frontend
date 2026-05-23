import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { FileText } from 'lucide-react';

const activities = [
	{ id: 1, user: 'John', action: 'moved API Integration to In Progress', time: '2m ago', avatar: 'J' },
	{ id: 2, user: 'Sarah', action: 'commented on Dashboard UI', time: '1h ago', avatar: 'S' },
	{ id: 3, user: 'Mike', action: 'completed Setup Database', time: '3h ago', avatar: 'M' },
	{ id: 4, user: 'Emma', action: 'uploaded a file', time: '5h ago', avatar: 'E', isFile: true },
];

// Server Component
export function ActivityTimeline() {
	return (
		<div className="space-y-6 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-4 md:before:translate-x-0 before:h-full before:w-px before:bg-slate-100">
			{activities.map((activity) => (
				<div key={activity.id} className="relative flex items-start gap-4">
					<div className="relative z-10 bg-white pt-1">
						{activity.isFile ? (
							<div className="h-8 w-8 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-400">
								<FileText className="h-4 w-4" />
							</div>
						) : (
							<Avatar className="h-8 w-8 border border-white shadow-sm">
								<AvatarFallback className="bg-indigo-100 text-indigo-700 text-xs font-bold">
									{activity.avatar}
								</AvatarFallback>
							</Avatar>
						)}
					</div>
					<div className="flex-1 flex flex-col pt-1.5">
						<p className="text-sm text-slate-600 leading-tight">
							<span className="font-semibold text-slate-900">{activity.user}</span> {activity.action}
						</p>
						<span className="text-xs text-slate-400 mt-1">{activity.time}</span>
					</div>
				</div>
			))}
			<div className="pt-2">
				<button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">View all</button>
			</div>
		</div>
	);
}
