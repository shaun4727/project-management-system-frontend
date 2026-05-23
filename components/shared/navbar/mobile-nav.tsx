'use client';

import { cn } from '@/lib/utils';
import { CheckSquare, FolderKanban, LayoutDashboard, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const MobileNav = () => {
	const pathname = usePathname();
	return (
		<nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-slate-200 pb-safe z-50">
			<div className="flex items-center justify-around h-16 px-2">
				{[
					{ name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
					{ name: 'Projects', href: '/projects', icon: FolderKanban },
					{ name: 'Tasks', href: '/tasks', icon: CheckSquare },
					{ name: 'More', href: '/more', icon: Settings },
				].map((item) => {
					const isActive = pathname.startsWith(item.href);
					return (
						<Link
							key={item.name}
							href={item.href}
							className={cn(
								'flex flex-col items-center justify-center w-full h-full space-y-1',
								isActive ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900',
							)}
						>
							<item.icon className="h-5 w-5" />
							<span className="text-[10px] font-medium">{item.name}</span>
						</Link>
					);
				})}
			</div>
		</nav>
	);
};
