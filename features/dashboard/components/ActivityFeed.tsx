import { Avatar, AvatarFallback } from '@/components/ui/avatar';

// Mock data - in reality, this is passed down from the Page component
const activities = [
	{ id: 1, user: 'John Doe', action: 'moved Login API task to In Progress', time: '2m ago', initials: 'JD' },
	{ id: 2, user: 'Sarah', action: 'added a comment on Dashboard UI', time: '1h ago', initials: 'S', isLink: true },
	{ id: 3, user: 'Alex', action: 'completed Setup Database task', time: '2h ago', initials: 'A' },
];

// Server Component
export function ActivityFeed() {
	return (
		<div className="space-y-4">
			{activities.map((activity) => (
				<div key={activity.id} className="flex items-start gap-3">
					<Avatar className="h-8 w-8">
						<AvatarFallback className="bg-indigo-50 text-indigo-600 text-xs font-bold">
							{activity.initials}
						</AvatarFallback>
					</Avatar>
					<div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
						<p className="text-sm text-slate-600 leading-tight">
							{activity.isLink ? (
								<span className="font-semibold text-indigo-600 cursor-pointer">{activity.user}</span>
							) : (
								<span className="font-semibold text-slate-900">{activity.user}</span>
							)}{' '}
							{activity.action}
						</p>
						<span className="text-xs text-slate-400 shrink-0">{activity.time}</span>
					</div>
				</div>
			))}
		</div>
	);
}
