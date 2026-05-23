import { AnimatedContainer } from '@/components/shared/animatedContainer';
import { Card } from '@/components/ui/card';
import { ActivityFeed } from '@/features/dashboard/components/ActivityFeed'; // Reusing from previous phase
import { ActivityFilters } from '@/features/projects/components/activity-filter';
import { ProjectTabs } from '@/features/projects/components/project-tabs';
import { Bell, Search } from 'lucide-react';

// SERVER COMPONENT (Smart/Container)
export default async function ProjectActivityPage({ params }: { params: { id: string } }) {
	const projectId = params.id;

	return (
		<AnimatedContainer stagger={true} className="space-y-6 max-w-7xl mx-auto">
			{/* Header Section */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2 gsap-item">
				<h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Project Alpha</h1>
				<div className="flex items-center gap-4 hidden sm:flex">
					<button className="text-slate-400 hover:text-slate-600">
						<Search className="h-5 w-5" />
					</button>
					<button className="text-slate-400 hover:text-slate-600">
						<Bell className="h-5 w-5" />
					</button>
					<img src="/avatar.jpg" alt="User" className="h-8 w-8 rounded-full object-cover" />
				</div>
			</div>

			<div className="gsap-item">
				<ProjectTabs projectId={projectId} activeTab="Activity" />
			</div>

			{/* Main Grid: Feed (Left) & Filters (Right) */}
			<div className="grid grid-cols-1 lg:grid-cols-4 gap-6 gsap-item">
				{/* Left Column: Activity Feed */}
				<div className="lg:col-span-3">
					<Card className="p-6 border-slate-100 shadow-sm bg-white rounded-2xl min-h-[500px]">
						<h2 className="text-lg font-bold text-slate-900 mb-6">Activity Feed</h2>
						<div className="max-w-3xl">
							<ActivityFeed />
						</div>
					</Card>
				</div>

				{/* Right Column: Filters (Client Component) */}
				<div className="lg:col-span-1 hidden md:block">
					<ActivityFilters />
				</div>
			</div>
		</AnimatedContainer>
	);
}
