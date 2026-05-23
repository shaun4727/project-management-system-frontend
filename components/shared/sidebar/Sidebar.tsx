'use client';

import { cn } from '@/lib/utils';
import { Activity, Calendar, CheckSquare, FolderKanban, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MAIN_NAV = [
	{ name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
	{ name: 'Projects', href: '/projects', icon: FolderKanban },
	{ name: 'Sprints', href: '/sprints', icon: Activity },
	{ name: 'Tasks', href: '/tasks', icon: CheckSquare },
	{ name: 'Calendar', href: '/calendar', icon: Calendar },
	{ name: 'Activity', href: '/activity', icon: Activity },
];

export function Sidebar() {
	const pathname = usePathname();

	return (
		<aside className="hidden md:flex w-64 flex-col border-r border-slate-200 bg-white">
			<div className="flex h-16 items-center px-6 border-b border-slate-100">
				<div className="flex items-center gap-2 text-primary font-bold text-xl">
					<div className="bg-indigo-600 text-white p-1.5 rounded-lg text-sm">M</div>
					MPMS
				</div>
			</div>

			<div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
				{MAIN_NAV.map((item) => {
					const isActive = pathname.startsWith(item.href);
					return (
						<Link
							key={item.name}
							href={item.href}
							className={cn(
								'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
								isActive
									? 'bg-indigo-50 text-indigo-600'
									: 'text-slate-500 hover:bg-slate-50 hover:text-slate-900',
							)}
						>
							<item.icon className="h-4 w-4" />
							{item.name}
						</Link>
					);
				})}
			</div>

			{/* User Profile Area */}
			<div className="p-4 border-t border-slate-100 mt-auto">
				<div className="flex items-center gap-3">
					<img src="/avatar.jpg" alt="User" className="h-9 w-9 rounded-full object-cover" />
					<div className="flex flex-col">
						<span className="text-sm font-semibold text-slate-900">Alex Johnson</span>
						<span className="text-xs text-slate-500">Manager</span>
					</div>
				</div>
			</div>
		</aside>
	);
}
