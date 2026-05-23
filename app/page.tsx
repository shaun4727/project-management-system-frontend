import { fetchDashboardSummary } from '@/actions/dashboard.actions';
import { AnimatedContainer } from '@/components/shared/animatedContainer';
import { Card } from '@/components/ui/card';
import { CheckSquare, Clock, FolderKanban } from 'lucide-react';
// Import your Recharts Client Components here when ready
// import { ProjectsOverviewChart } from '@/features/dashboard/components/ProjectsOverviewChart';

// THIS IS A SERVER COMPONENT (No 'use client')
export default async function DashboardPage() {
	// 1. Fetch data directly on the server
	let summaryData;
	try {
		const response = await fetchDashboardSummary();
		summaryData = response.data;
	} catch (error) {
		// Graceful fallback if the API fails
		return <div className="p-8 text-red-500">Failed to load dashboard data. Please try again.</div>;
	}

	const { stats, recentActivity, overview } = summaryData;

	// Map the API stats to the UI configuration
	const statCards = [
		{ label: 'Total Projects', value: stats.totalProjects, icon: FolderKanban },
		{ label: 'My Active Tasks', value: stats.activeTasks, icon: CheckSquare },
		{ label: 'Tasks Completed', value: stats.tasksCompleted, icon: CheckSquare },
		{ label: 'Total Hours Logged', value: `${stats.totalHoursLogged}h`, icon: Clock },
	];

	return (
		<AnimatedContainer>
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 gsap-widget">
				<div>
					<h1 className="text-2xl font-bold text-slate-900">Welcome back 👋</h1>
					<p className="text-sm text-slate-500 mt-1">Here's what happening with your projects today.</p>
				</div>
				<select className="bg-white border border-slate-200 text-sm rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
					<option>Filter: This Month</option>
				</select>
			</div>

			{/* Stats Row */}
			<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
				{statCards.map((stat, i) => (
					<Card
						key={i}
						className="gsap-widget p-5 border-slate-100 shadow-sm hover:shadow-md transition-shadow bg-white rounded-2xl"
					>
						<div className="flex items-center gap-2 text-indigo-600 mb-3">
							<stat.icon className="h-4 w-4" />
							<span className="text-sm font-semibold text-slate-600">{stat.label}</span>
						</div>
						<div className="text-3xl font-bold text-slate-900">{stat.value}</div>
					</Card>
				))}
			</div>

			{/* Middle Row: Charts & Activity */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card className="gsap-widget p-6 border-slate-100 shadow-sm bg-white rounded-2xl min-h-[300px] flex flex-col">
					<h3 className="text-base font-bold text-slate-900 mb-6">Projects Overview</h3>
					<div className="flex-1 flex items-center justify-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
						{/* Pass the overview data to your Client Component Chart */}
						{/* <ProjectsOverviewChart data={overview} /> */}
						<span className="text-slate-400 text-sm">Chart Placeholder</span>
					</div>
				</Card>

				<Card className="gsap-widget p-6 border-slate-100 shadow-sm bg-white rounded-2xl">
					<div className="flex justify-between items-center mb-6">
						<h3 className="text-base font-bold text-slate-900">Recent Activity</h3>
						<button className="text-sm text-indigo-600 font-medium">View all</button>
					</div>
					<div className="space-y-4">
						{recentActivity.length > 0 ? (
							recentActivity.map((activity) => (
								<div key={activity.id} className="flex items-center gap-3">
									<div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
										{activity.user.initials}
									</div>
									<p className="text-sm text-slate-600 flex-1">
										<span className="font-semibold text-slate-900">{activity.user.name}</span>{' '}
										{activity.action}
									</p>
									<span className="text-xs text-slate-400 shrink-0">{activity.time}</span>
								</div>
							))
						) : (
							<p className="text-sm text-slate-500">No recent activity.</p>
						)}
					</div>
				</Card>
			</div>

			{/* Bottom Row */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card className="gsap-widget p-6 border-slate-100 shadow-sm bg-white rounded-2xl min-h-[250px]">
					<h3 className="text-base font-bold text-slate-900 mb-6">My Tasks</h3>
					{/* Map your myTasks array here */}
				</Card>

				<Card className="gsap-widget p-6 border-slate-100 shadow-sm bg-white rounded-2xl min-h-[250px] flex flex-col">
					<div className="flex justify-between items-center mb-6">
						<h3 className="text-base font-bold text-slate-900">Productivity</h3>
						<select className="bg-slate-50 border border-slate-200 text-xs rounded-md px-2 py-1">
							<option>This Month</option>
						</select>
					</div>
					<div className="flex-1 bg-slate-50 rounded-xl border border-dashed border-slate-200 flex items-center justify-center">
						<span className="text-slate-400 text-sm">Productivity Graph Placeholder</span>
					</div>
				</Card>
			</div>
		</AnimatedContainer>
	);
}
