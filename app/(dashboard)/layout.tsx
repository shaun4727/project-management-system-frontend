import { Sidebar } from '@/components/shared/sidebar/Sidebar';
import { Bell, Menu, Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
	return (
		// flex-1 ensures it fills the flex flex-col body from your RootLayout
		<div className="flex flex-1 h-full bg-[#f8fafc] text-slate-900 overflow-hidden font-sans">
			{/* 1. DESKTOP SIDEBAR (Server Component or Static) */}
			<Sidebar />

			<div className="flex-1 flex flex-col min-w-0 overflow-hidden">
				{/* 2. TOP NAVIGATION BAR */}
				<header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0 z-10">
					<div className="flex-1 flex items-center gap-4">
						{/* Mobile Menu Trigger (Visible only on small screens) */}
						<button className="md:hidden p-2 -ml-2 text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-50">
							<Menu className="h-5 w-5" />
						</button>

						{/* Global Search */}
						<div className="hidden sm:flex relative w-64 md:w-80">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
							<input
								type="text"
								placeholder="Search projects, tasks..."
								className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
							/>
						</div>
					</div>

					{/* Right Side Actions & Profile */}
					<div className="flex items-center gap-3 sm:gap-4">
						<button className="text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-50 transition-colors">
							<Bell className="h-5 w-5" />
						</button>
						<button className="hidden sm:flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
							<Plus className="h-4 w-4" /> New Project
						</button>
						<div className="h-8 w-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-xs ml-2 shadow-sm cursor-pointer">
							AD
						</div>
					</div>
				</header>

				{/* 3. MAIN CONTENT AREA */}
				<main className="flex-1 overflow-y-auto pb-20 md:pb-0 relative">{children}</main>
			</div>

			{/* 4. MOBILE BOTTOM NAVIGATION (Matches your Image 10 requirement) */}
			<nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-slate-200 pb-safe z-50">
				<div className="flex items-center justify-around h-16 px-2">
					<Link
						href="/dashboard"
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
						<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
							/>
						</svg>
						<span className="text-[10px] font-medium">Projects</span>
					</Link>
					<Link
						href="/tasks"
						className="flex flex-col items-center justify-center w-full h-full space-y-1 text-slate-500 hover:text-slate-900"
					>
						<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
							/>
						</svg>
						<span className="text-[10px] font-medium">Tasks</span>
					</Link>
				</div>
			</nav>
		</div>
	);
}
