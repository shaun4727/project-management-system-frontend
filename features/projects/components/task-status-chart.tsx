'use client';

import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { SummaryProps } from '../types/project.types';

const data = [
	{ name: 'Todo', value: 24, percentage: 30, color: '#3b82f6' }, // blue-500
	{ name: 'In Progress', value: 40, percentage: 50, color: '#10b981' }, // emerald-500
	{ name: 'Review Required', value: 10, percentage: 12, color: '#eab308' }, // yellow-500
	{ name: 'Done', value: 16, percentage: 20, color: '#6366f1' }, // indigo-500
];

export function TaskStatusChart({ stats }: SummaryProps) {
	return (
		<div className="flex flex-col sm:flex-row items-center gap-6 h-full w-full">
			<div className="h-40 w-40 shrink-0">
				<ResponsiveContainer width="100%" height="100%">
					<PieChart>
						<Pie
							data={data}
							innerRadius={45}
							outerRadius={70}
							paddingAngle={2}
							dataKey="value"
							stroke="none"
						>
							{data.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={entry.color} />
							))}
						</Pie>
					</PieChart>
				</ResponsiveContainer>
			</div>

			<div className="flex flex-col gap-3 flex-1 w-full">
				{data.map((item) => (
					<div key={item.name} className="flex items-center justify-between text-sm w-full">
						<div className="flex items-center gap-2">
							<div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
							<span className="text-slate-600 font-medium">{item.name}</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="font-semibold text-slate-900">{item.value}</span>
							<span className="text-slate-400 text-xs w-10 text-right">({item.percentage}%)</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
