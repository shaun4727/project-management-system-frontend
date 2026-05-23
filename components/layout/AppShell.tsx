'use client';

import { Bell, Menu, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sidebar } from '../shared/sidebar/Sidebar';

export function AppShell({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();

	// Check if we are on an authentication route
	const isAuthRoute = pathname === '/login' || pathname?.startsWith('/register');

	// If it is the login page, just return the page content with NO sidebar
	if (isAuthRoute) {
		return <div className="flex-1 flex flex-col">{children}</div>;
	}

	// Otherwise, render the full Dashboard Layout with the Sidebar
	return (
		<div className="flex flex-1 h-[100vh] bg-[#f8fafc] text-slate-900 overflow-hidden font-sans">
			{/* DESKTOP SIDEBAR */}
			<Sidebar />

			<div className="flex-1 flex flex-col min-w-0 overflow-hidden">
				{/* TOP NAVIGATION BAR */}
				<header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0 z-10">
					<div className="flex-1 flex items-center gap-4">
						<button className="md:hidden p-2 -ml-2 text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-50">
							<Menu className="h-5 w-5" />
						</button>
						<div className="hidden sm:flex relative w-64 md:w-80">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
							<input
								type="text"
								placeholder="Search projects, tasks..."
								className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
							/>
						</div>
					</div>
					<div className="flex items-center gap-3 sm:gap-4">
						<button className="text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-50 transition-colors">
							<Bell className="h-5 w-5" />
						</button>

						<div className="h-8 w-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-xs ml-2 shadow-sm cursor-pointer">
							AD
						</div>
					</div>
				</header>

				{/* MAIN CONTENT AREA */}
				<main className="flex-1 overflow-y-auto pb-20 md:pb-0 relative">{children}</main>
			</div>

			{/* MOBILE BOTTOM NAVIGATION (Matches your Image 10 requirement) */}
			<nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-slate-200 pb-safe z-50">
				<div className="flex items-center justify-around h-16 px-2">
					<Link
						href="/"
						className="flex flex-col items-center justify-center w-full h-full space-y-1 text-indigo-600"
					>
						<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
							/>
						</svg>
						<span className="text-[10px] font-medium">Home</span>
					</Link>
					<Link
						href="/projects"
						className="flex flex-col items-center justify-center w-full h-full space-y-1 text-slate-500 hover:text-slate-900"
					>
						{/* ... SVG for Projects ... */}
						<span className="text-[10px] font-medium">Projects</span>
					</Link>
				</div>
			</nav>
		</div>
	);
}
