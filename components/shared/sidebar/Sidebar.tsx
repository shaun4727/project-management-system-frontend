'use client';

import { cn } from '@/lib/utils';
import { useAuth } from '@/providers/auth-provider';
import { Activity, CheckSquare, FolderKanban, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MAIN_NAV = [
	{ name: 'Dashboard', href: '/', icon: LayoutDashboard },
	{ name: 'Projects', href: '/projects', icon: FolderKanban },
	{ name: 'Tasks', href: '/tasks', icon: CheckSquare },
	{ name: 'Team', href: '/team', icon: Activity },
	{ name: 'Task Board', href: '/tasks/board', icon: FolderKanban },
];

interface SidebarProps {
	isMobileWrapper?: boolean;
}

export function Sidebar({ isMobileWrapper = false }: SidebarProps) {
	const pathname = usePathname();
	const { user } = useAuth();

	const filteredNav = MAIN_NAV.filter((item) => {
		if (item.name === 'Team' && user?.role !== 'ADMIN') return false;
		return true;
	});

	const matchingItems = filteredNav.filter((item) => {
		if (item.href === '/') {
			return pathname === '/';
		}
		return pathname === item.href || pathname.startsWith(`${item.href}/`);
	});
	const activeItem = matchingItems.sort((a, b) => b.href.length - a.href.length)[0];

	return (
		<aside
			className={cn(
				'w-64 flex-col border-r border-slate-200 bg-white h-full',
				isMobileWrapper ? 'flex' : 'hidden md:flex', // Overrides hidden flag if mounted inside Sheet
			)}
		>
			<div className="flex h-16 items-center px-6 border-b border-slate-100 shrink-0">
				<div className="flex items-center gap-2 text-primary font-bold text-xl">
					<div className="bg-indigo-600 text-white p-1.5 rounded-lg text-sm">M</div>
					MPMS
				</div>
			</div>

			<div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
				{filteredNav.map((item) => {
					const isActive = activeItem?.href === item.href;

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
		</aside>
	);
}
