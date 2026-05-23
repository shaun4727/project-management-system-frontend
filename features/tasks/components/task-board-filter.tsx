'use client';

import { Button } from '@/components/ui/button';
import { AlertCircle, Filter, Plus, Search, User } from 'lucide-react';

// CLIENT COMPONENT: Interactive filters and actions
export function TaskBoardFilters() {
	return (
		<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full">
			<div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto">
				<div className="relative flex-1 sm:w-64">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
					<input
						type="text"
						placeholder="Search tasks..."
						className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-700 transition-all shadow-sm"
					/>
				</div>

				<Button
					variant="outline"
					size="sm"
					className="bg-white border-slate-200 text-slate-600 gap-2 h-9 shadow-sm hidden sm:flex"
				>
					<Filter className="h-4 w-4 text-slate-400" /> Filter
				</Button>
				<Button
					variant="outline"
					size="sm"
					className="bg-white border-slate-200 text-slate-600 gap-2 h-9 shadow-sm hidden sm:flex"
				>
					<User className="h-4 w-4 text-slate-400" /> Assignee <span className="text-slate-300 ml-1">▼</span>
				</Button>
				<Button
					variant="outline"
					size="sm"
					className="bg-white border-slate-200 text-slate-600 gap-2 h-9 shadow-sm hidden md:flex"
				>
					<AlertCircle className="h-4 w-4 text-slate-400" /> Priority{' '}
					<span className="text-slate-300 ml-1">▼</span>
				</Button>
			</div>

			<Button className="bg-indigo-600 hover:bg-indigo-700 text-white w-full md:w-auto gap-2 h-9 shadow-sm">
				<Plus className="h-4 w-4" /> New Task
			</Button>
		</div>
	);
}
