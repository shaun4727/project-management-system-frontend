import { fetchDashboardSummary } from '@/actions/dashboard.actions';
import { AnimatedContainer } from '@/components/shared/animatedContainer';
import { Card } from '@/components/ui/card';
import { ProjectsOverviewChart } from '@/features/dashboard/components/ProjectsOverviewCharts';
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
		return (
			<div className="p-8 flex items-center justify-center min-h-[400px]">
				<div className="text-center p-6 bg-red-50 border border-red-100 rounded-xl text-red-600">
					<p className="font-semibold text-lg">Failed to load dashboard data.</p>
					<p className="text-sm mt-1 opacity-80">Please check your backend connection and try again.</p>
				</div>
			</div>
		);
	}

	const { stats, recentActivity, overview } = summaryData;

	// Map the API stats to the UI configuration
	const statCards = [
		{ label: 'Total Projects', value: overview.totalProjects, icon: FolderKanban },
		{ label: 'My Active Tasks', value: overview.activeTasks, icon: CheckSquare },
		{ label: 'Tasks Completed', value: overview.completedTasks, icon: CheckSquare },
		{ label: 'Total Hours Logged', value: `${overview.totalHoursLogged}h`, icon: Clock },
	];

	return (
		// Added padding (p-4 to p-8), centered it (mx-auto), and constrained width (max-w-7xl)
		<AnimatedContainer className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6 md:space-y-8">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 gsap-widget">
				<div>
					<h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Welcome back 👋</h1>
					<p className="text-sm text-slate-500 mt-1">Here's what happening with your projects today.</p>
				</div>
				<select className="bg-white border border-slate-200 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
					<option>Filter: This Month</option>
					<option>Filter: This Week</option>
				</select>
			</div>

			{/* Stats Row */}
			<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
				{statCards.map((stat, i) => (
					<Card
						key={i}
						className="gsap-widget p-5 border-slate-200 shadow-sm hover:shadow-md transition-all bg-white rounded-2xl"
					>
						<div className="flex items-center gap-2 text-indigo-600 mb-3">
							<stat.icon className="h-4 w-4" />
							<span className="text-sm font-semibold text-slate-600">{stat.label}</span>
						</div>
						<div className="text-3xl font-bold text-slate-900 tracking-tight">{stat.value}</div>
					</Card>
				))}
			</div>

			{/* Middle Row: Charts & Activity */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card className="gsap-widget p-6 border-slate-200 shadow-sm bg-white rounded-2xl min-h-[300px] flex flex-col">
					<h3 className="text-base font-bold text-slate-900 mb-6">Projects Overview</h3>
					{/* 2. REMOVE the placeholder div and ADD the chart */}
					<div className="flex-1 w-full">
						<ProjectsOverviewChart data={overview} />
					</div>
				</Card>

				<Card className="gsap-widget p-6 border-slate-200 shadow-sm bg-white rounded-2xl">
					<div className="flex justify-between items-center mb-6">
						<h3 className="text-base font-bold text-slate-900">Recent Activity</h3>
						<button className="text-sm text-indigo-600 font-medium hover:text-indigo-700 transition-colors">
							View all
						</button>
					</div>
					<div className="space-y-5">
						{recentActivity?.length > 0 ? (
							recentActivity.map((activity) => (
								<div key={activity.id} className="flex items-start gap-3">
									<div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
										{activity.user.initials}
									</div>
									<div className="flex-1 min-w-0">
										<p className="text-sm text-slate-700 leading-snug">
											<span className="font-semibold text-slate-900">{activity.user.name}</span>{' '}
											{activity.action}
										</p>
										<p className="text-xs text-slate-400 mt-1">{activity.time}</p>
									</div>
								</div>
							))
						) : (
							<div className="flex flex-col items-center justify-center py-8 text-slate-400">
								<Clock className="h-8 w-8 mb-2 opacity-50" />
								<p className="text-sm">No recent activity.</p>
							</div>
						)}
					</div>
				</Card>
			</div>

			{/* Bottom Row */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
				<Card className="gsap-widget p-6 border-slate-200 shadow-sm bg-white rounded-2xl min-h-[250px]">
					<h3 className="text-base font-bold text-slate-900 mb-6">My Tasks</h3>
					{/* Map your myTasks array here */}
					<div className="flex flex-col items-center justify-center h-[150px] text-slate-400 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
						<span className="text-sm font-medium">No active tasks</span>
					</div>
				</Card>

				<Card className="gsap-widget p-6 border-slate-200 shadow-sm bg-white rounded-2xl min-h-[250px] flex flex-col">
					<div className="flex justify-between items-center mb-6">
						<h3 className="text-base font-bold text-slate-900">Productivity</h3>
						<select className="bg-white border border-slate-200 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm cursor-pointer">
							<option>This Month</option>
						</select>
					</div>
					<div className="flex-1 bg-slate-50/50 rounded-xl border border-dashed border-slate-200 flex items-center justify-center">
						<span className="text-slate-400 text-sm font-medium">Productivity Graph Placeholder</span>
					</div>
				</Card>
			</div>
		</AnimatedContainer>
	);
}
