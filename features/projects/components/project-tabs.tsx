import Link from 'next/link';

interface ProjectTabsProps {
	projectId: string;
	activeTab: 'Overview' | 'Sprints' | 'Tasks' | 'Activity' | 'Files' | 'Settings';
}

// SERVER COMPONENT (Dumb/Presentational)
export function ProjectTabs({ projectId, activeTab }: ProjectTabsProps) {
	const tabs = ['Overview', 'Sprints', 'Tasks', 'Activity', 'Files', 'Settings'];

	return (
		<nav className="flex overflow-x-auto border-b border-slate-200 hide-scrollbar gap-6 mb-6">
			{tabs.map((tab) => {
				const isActive = tab === activeTab;
				return (
					<Link
						key={tab}
						href={`/projects/${projectId}/${tab.toLowerCase()}`}
						className={`pb-3 text-sm font-semibold whitespace-nowrap transition-colors ${
							isActive
								? 'text-indigo-600 border-b-2 border-indigo-600'
								: 'text-slate-500 hover:text-slate-900'
						}`}
					>
						{tab}
					</Link>
				);
			})}
		</nav>
	);
}
