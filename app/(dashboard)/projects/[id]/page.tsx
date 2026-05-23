import { fetchProjectDetails } from '@/actions/project/project-detail.action';
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
import { AlertCircle, ArrowLeft, GitCompareArrows, Plus } from 'lucide-react';
import Link from 'next/link';

// Next.js 15 requires params to be awaited
export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
	const resolvedParams = await params;
	const projectId = resolvedParams.id;

	let data;
	try {
		data = await fetchProjectDetails(projectId);
	} catch (error) {
		// If it's a 404 or backend error, show a graceful fallback
		return (
			<div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-500">
				<AlertCircle className="h-10 w-10 text-red-500 mb-4" />
				<h2 className="text-xl font-bold text-slate-900">Project Not Found</h2>
				<p className="text-sm mt-1 mb-4">We couldn't load the details for this project.</p>
				<Link href="/projects">
					<Button variant="outline">
						<ArrowLeft className="h-4 w-4 mr-2" /> Back to Projects
					</Button>
				</Link>
			</div>
		);
	}

	const { project, analytics, activities } = data;

	// Fallback stats if analytics endpoint is empty
	const stats = analytics || {
		total: 0,
		completed: 0,
		inProgress: 0,
		reviewRequired: 0,
		todo: 0,
		completionPercentage: 0,
	};

	return (
		<AnimatedContainer stagger={true} className="space-y-6 max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
			{/* Breadcrumb & Header */}
			<div className="gsap-item">
				<div className="flex items-center gap-2 text-sm text-slate-500 mb-4 font-medium">
					<Link href="/projects" className="flex items-center hover:text-slate-900 transition-colors">
						<ArrowLeft className="h-4 w-4 mr-1" /> Projects
					</Link>
					<span>›</span>
					<span className="text-slate-900 truncate max-w-[200px] sm:max-w-none">{project.title}</span>
				</div>

				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
					<div>
						<div className="flex items-center gap-3">
							<h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
								{project.title}
							</h1>
							<Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 shadow-none font-bold px-2.5 py-0.5 uppercase">
								{project.status}
							</Badge>
						</div>
						<p className="text-sm text-slate-500 mt-2 max-w-2xl">
							{project.description || 'No description provided.'}
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

			{/* Tabs Menu */}
			<nav className="gsap-item flex overflow-x-auto border-b border-slate-200 hide-scrollbar gap-6">
				{['Overview', 'Sprints', 'Tasks', 'Activity', 'Files', 'Settings'].map((tab, i) => (
					<div
						key={tab}
						className={`pb-3 text-sm font-semibold whitespace-nowrap cursor-pointer transition-colors ${i === 0 ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-900'}`}
					>
						{tab}
					</div>
				))}
			</nav>

			{/* Top Grid: Charts & Summary */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<Card className="gsap-item p-6 border-slate-200 shadow-sm rounded-xl bg-white flex flex-col">
					<h3 className="text-sm font-bold text-slate-900 mb-4">Completion</h3>
					<div className="flex-1 min-h-[200px]">
						<CompletionChart percentage={stats.completionPercentage} />
					</div>
				</Card>

				<Card className="gsap-item p-6 border-slate-200 shadow-sm rounded-xl bg-white flex flex-col">
					<h3 className="text-sm font-bold text-slate-900 mb-4">Task Status Breakdown</h3>
					<div className="flex-1 min-h-[200px]">
						<TaskStatusChart stats={stats} />
					</div>
				</Card>

				<Card className="gsap-item p-6 border-slate-200 shadow-sm rounded-xl bg-white">
					<h3 className="text-sm font-bold text-slate-900 mb-4">Summary</h3>
					<ProjectSummary stats={stats} />
				</Card>
			</div>

			{/* Bottom Grid: Sprints & Timeline */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-12">
				<Card className="gsap-item p-6 border-slate-200 shadow-sm rounded-xl bg-white lg:col-span-2">
					<div className="flex items-center justify-between mb-6">
						<h3 className="text-sm font-bold text-slate-900">Sprints</h3>
						<Link
							href={`/tasks?project=${projectId}`}
							className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
						>
							View Board →
						</Link>
					</div>
					{/* Pass sprints array to the component */}
					<SprintList sprints={project.sprints || []} />
				</Card>

				<Card className="gsap-item p-6 border-slate-200 shadow-sm rounded-xl bg-white max-h-[500px] overflow-y-auto custom-scrollbar">
					<h3 className="text-sm font-bold text-slate-900 mb-6 sticky top-0 bg-white z-10 pb-2">
						Activity Timeline
					</h3>
					{/* Pass activities array to the component */}
					<ActivityTimeline activities={activities || []} />
				</Card>
			</div>
		</AnimatedContainer>
	);
}
