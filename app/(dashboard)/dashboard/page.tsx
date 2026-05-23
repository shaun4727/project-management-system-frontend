import { AnimatedContainer } from '@/components/shared/animatedContainer';
import { StatCard } from '@/components/shared/state-card';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ActivityFeed } from '@/features/dashboard/components/ActivityFeed';
import { ProjectsOverviewChart } from '@/features/dashboard/components/ProjectsOverviewCharts';
import { CheckSquare, Clock, FolderKanban, Plus } from 'lucide-react';

// SERVER COMPONENT (Default in App Router)
export default async function DashboardPage() {
	// In a real scenario, you would fetch your summary API data here
	// const data = await fetchDashboardSummary();

	return (
		<AnimatedContainer stagger={true} className="space-y-6 pb-20 md:pb-0">
			{/* 1. Header Section */}
			<header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 gsap-item">
				<div>
					<h1 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome back, Alex 👋</h1>
					<p className="text-sm text-slate-500 mt-1">Here's what happening with your projects today.</p>
				</div>
				<div className="flex items-center gap-3">
					{/* Client Component inline for dropdown */}
					<select className="bg-white border border-slate-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-600 cursor-pointer hidden sm:block">
						<option>Filter: This Month</option>
					</select>
					<Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg gap-2">
						<Plus className="h-4 w-4" /> New Project
					</Button>
				</div>
			</header>

			{/* 2. Stats Grid (Responsive: 2 cols mobile, 4 cols desktop) */}
			<section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
				<StatCard title="Total Projects" value="24" icon={FolderKanban} />
				<StatCard title="My Active Tasks" value="36" icon={CheckSquare} />
				<StatCard title="Tasks Completed" value="128" icon={CheckSquare} />
				<StatCard title="Total Hours Logged" value="245h" icon={Clock} />
			</section>

			{/* 3. Middle Charts & Activity Grid */}
			<section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Projects Overview */}
				<Card className="gsap-item p-6 border-slate-100 shadow-sm bg-white rounded-2xl flex flex-col">
					<h3 className="text-base font-bold text-slate-900 mb-6">Projects Overview</h3>
					<div className="flex-1 flex items-center">
						{/* The interactive chart is rendered on the client */}
						<ProjectsOverviewChart />
					</div>
				</Card>

				{/* Recent Activity */}
				<Card className="gsap-item p-6 border-slate-100 shadow-sm bg-white rounded-2xl">
					<div className="flex justify-between items-center mb-6">
						<h3 className="text-base font-bold text-slate-900">Recent Activity</h3>
						<button className="text-sm text-indigo-600 font-medium hover:text-indigo-700 transition-colors">
							View all
						</button>
					</div>
					{/* Dumb server component renders the list */}
					<ActivityFeed />
				</Card>
			</section>
		</AnimatedContainer>
	);
}
