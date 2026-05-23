import { Bell, Plus, Search } from 'lucide-react';

export const NavBar = () => {
	return (
		<header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0">
			<div className="flex-1 flex items-center">
				{/* Page Title injected dynamically based on route, or keep generic search here */}
				<div className="hidden sm:flex relative w-64">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
					<input
						type="text"
						placeholder="Search tasks..."
						className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
					/>
				</div>
			</div>
			<div className="flex items-center gap-4">
				<button className="text-slate-400 hover:text-slate-600">
					<Bell className="h-5 w-5" />
				</button>
				<button className="hidden sm:flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
					<Plus className="h-4 w-4" /> New Project
				</button>
			</div>
		</header>
	);
};
