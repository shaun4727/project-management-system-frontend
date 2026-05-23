import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { FileText } from 'lucide-react';
import { ActivityTimelineProps } from '../types/project.types';

// 1. Define the exact shape of your Prisma ActivityLog data

// 2. Server-side helper to calculate relative time (e.g., "2m ago", "3h ago")
function getRelativeTime(date: string | Date) {
	const now = new Date();
	const past = new Date(date);
	const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

	if (diffInSeconds < 60) return 'Just now';
	const diffInMinutes = Math.floor(diffInSeconds / 60);
	if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
	const diffInHours = Math.floor(diffInMinutes / 60);
	if (diffInHours < 24) return `${diffInHours}h ago`;
	const diffInDays = Math.floor(diffInHours / 24);
	return `${diffInDays}d ago`;
}

// 3. Helper to extract initials (e.g., "John Doe" -> "JD")
function getInitials(name: string) {
	if (!name) return 'U';
	return name
		.split(' ')
		.map((n) => n[0])
		.join('')
		.substring(0, 2)
		.toUpperCase();
}

// SMART SERVER COMPONENT
export function ActivityTimeline({ activities }: ActivityTimelineProps) {
	// 4. Handle Empty State gracefully
	if (!activities || activities.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-10 text-slate-400">
				<span className="text-sm font-medium">No recent activity on this project.</span>
			</div>
		);
	}

	return (
		<div className="space-y-6 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-4 md:before:translate-x-0 before:h-full before:w-px before:bg-slate-100">
			{activities.map((activity) => {
				// Determine if it's a file action to render the specific icon
				const isFileAction = activity.action.includes('FILE') || activity.details.includes('uploaded');

				return (
					<div key={activity.id} className="relative flex items-start gap-4">
						<div className="relative z-10 bg-white pt-1">
							{isFileAction ? (
								<div className="h-8 w-8 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-400">
									<FileText className="h-4 w-4" />
								</div>
							) : (
								<Avatar className="h-8 w-8 border border-white shadow-sm">
									<AvatarFallback className="bg-indigo-100 text-indigo-700 text-xs font-bold">
										{getInitials(activity.user.name)}
									</AvatarFallback>
								</Avatar>
							)}
						</div>
						<div className="flex-1 flex flex-col pt-1.5">
							<p className="text-sm text-slate-600 leading-tight">
								<span className="font-semibold text-slate-900">{activity.user.name}</span>{' '}
								{/* Map the details string directly here */}
								{activity.details}
							</p>
							<span className="text-xs text-slate-400 mt-1">{getRelativeTime(activity.createdAt)}</span>
						</div>
					</div>
				);
			})}

			{/* Optional: Only show "View all" if there are enough activities */}
			{activities.length >= 5 && (
				<div className="pt-2">
					<button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
						View all
					</button>
				</div>
			)}
		</div>
	);
}
