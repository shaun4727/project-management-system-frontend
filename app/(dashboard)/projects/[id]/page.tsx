import { AnimatedContainer } from '@/components/shared/animatedContainer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ActivityTimeline } from '@/features/projects/components/activity-timeline';
import { CompletionChart } from '@/features/projects/components/completion-charts';
import { ExportCsvButton } from '@/features/projects/components/export-csv-button';
import { ProjectSummary } from '@/features/projects/components/project-summary';
import { SprintList } from '@/features/projects/components/sprint-list';
import { TaskStatusChart } from '@/features/projects/components/task-status-chart';
import { ArrowLeft, GitCompareArrows, Plus } from 'lucide-react';
import Link from 'next/link';

// SMART SERVER COMPONENT
export default async function ProjectDetailsPage({ params }: { params: { id: string } }) {
	// In production, fetch project data based on params.id here.
	const projectId = params.id;

	const mockStats = {
		total: 80,
		completed: 16,
		inProgress: 40,
		reviewRequired: 10,
		todo: 24,
	};

	return (
		<AnimatedContainer stagger={true} className="space-y-6 max-w-6xl mx-auto">
			{/* Breadcrumb & Header */}
			<div className="gsap-item">
				<div className="flex items-center gap-2 text-sm text-slate-500 mb-4 font-medium">
					<Link href="/projects" className="flex items-center hover:text-slate-900 transition-colors">
						<ArrowLeft className="h-4 w-4 mr-1" /> Projects
					</Link>
					<span>›</span>
					<span className="text-slate-900">Project Alpha</span>
				</div>

				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
					<div>
						<div className="flex items-center gap-3">
							<h1 className="text-3xl font-bold text-slate-900 tracking-tight">Project Alpha</h1>
							<Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 shadow-none font-bold px-2.5 py-0.5">
								Active
							</Badge>
						</div>
						<p className="text-sm text-slate-500 mt-2">
							Build a suite of project management tools for teams.
						</p>
					</div>

					<div className="flex items-center gap-3">
						<Button
							variant="outline"
							size="icon"
							className="border-slate-200 text-slate-500 hidden sm:flex"
						>
							<GitCompareArrows className="h-4 w-4" />
						</Button>
						<ExportCsvButton projectId={projectId} />
						<Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm gap-2">
							<Plus className="h-4 w-4" /> New Sprint
						</Button>
					</div>
				</div>
			</div>

			{/* Tabs Menu (Dumb visual layout for RSC) */}
			<nav className="gsap-item flex overflow-x-auto border-b border-slate-200 hide-scrollbar gap-6">
				{['Overview', 'Sprints', 'Tasks', 'Activity', 'Files', 'Settings'].map((tab, i) => (
					<div
						key={tab}
						className={`pb-3 text-sm font-semibold whitespace-nowrap cursor-pointer ${i === 0 ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-900'}`}
					>
						{tab}
					</div>
				))}
			</nav>

			{/* Top Grid: Charts & Summary */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<Card className="gsap-item p-6 border-slate-200 shadow-sm rounded-xl bg-white">
					<h3 className="text-sm font-bold text-slate-900 mb-4">Completion</h3>
					<CompletionChart percentage={68} />
				</Card>

				<Card className="gsap-item p-6 border-slate-200 shadow-sm rounded-xl bg-white">
					<h3 className="text-sm font-bold text-slate-900 mb-4">Task Status Breakdown</h3>
					<TaskStatusChart />
				</Card>

				<Card className="gsap-item p-6 border-slate-200 shadow-sm rounded-xl bg-white">
					<h3 className="text-sm font-bold text-slate-900 mb-4">Summary</h3>
					<ProjectSummary stats={mockStats} />
				</Card>
			</div>

			{/* Bottom Grid: Sprints & Timeline */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<Card className="gsap-item p-6 border-slate-200 shadow-sm rounded-xl bg-white lg:col-span-2">
					<h3 className="text-sm font-bold text-slate-900 mb-6">Sprints</h3>
					<SprintList />
				</Card>

				<Card className="gsap-item p-6 border-slate-200 shadow-sm rounded-xl bg-white">
					<h3 className="text-sm font-bold text-slate-900 mb-6">Activity Timeline</h3>
					<ActivityTimeline />
				</Card>
			</div>
		</AnimatedContainer>
	);
}
