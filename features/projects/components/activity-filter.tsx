'use client';

import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

// CLIENT COMPONENT (Smart/Interactive)
export function ActivityFilters() {
	const [filters, setFilters] = useState({
		taskUpdates: true,
		comments: true,
		files: true,
		sprints: true,
		timeLogs: true,
	});

	return (
		<Card className="p-6 border-slate-100 shadow-sm bg-white rounded-2xl sticky top-20">
			<div className="space-y-6">
				<div>
					<h3 className="text-sm font-bold text-slate-900 mb-3">Filters</h3>
					<Select defaultValue="all">
						<SelectTrigger className="w-full mb-3 bg-slate-50 border-slate-200">
							<SelectValue placeholder="All Activities" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Activities</SelectItem>
							<SelectItem value="mine">My Activities</SelectItem>
						</SelectContent>
					</Select>

					<div className="flex items-center gap-2">
						<Select defaultValue="this-week">
							<SelectTrigger className="w-full bg-slate-50 border-slate-200">
								<SelectValue placeholder="This Week" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="today">Today</SelectItem>
								<SelectItem value="this-week">This Week</SelectItem>
								<SelectItem value="this-month">This Month</SelectItem>
							</SelectContent>
						</Select>
						<button className="text-xs font-semibold text-indigo-600 px-2 hover:text-indigo-700 transition-colors">
							Clear
						</button>
					</div>
				</div>

				<div>
					<h3 className="text-sm font-bold text-slate-900 mb-4">Activity Types</h3>
					<div className="space-y-3">
						{[
							{ id: 'taskUpdates', label: 'Task Updates' },
							{ id: 'comments', label: 'Comments' },
							{ id: 'files', label: 'Files' },
							{ id: 'sprints', label: 'Sprints' },
							{ id: 'timeLogs', label: 'Time Logs' },
						].map((type) => (
							<div key={type.id} className="flex items-center space-x-2">
								<Checkbox
									id={type.id}
									checked={filters[type.id as keyof typeof filters]}
									onCheckedChange={(checked: any) =>
										setFilters((prev) => ({ ...prev, [type.id]: !!checked }))
									}
									className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
								/>
								<label
									htmlFor={type.id}
									className="text-sm font-medium text-slate-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
								>
									{type.label}
								</label>
							</div>
						))}
					</div>
				</div>
			</div>
		</Card>
	);
}
