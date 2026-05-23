'use client';

import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

const data = [
	{ name: 'Completed', value: 12, color: '#22c55e' }, // green-500
	{ name: 'In Progress', value: 8, color: '#eab308' }, // yellow-500
	{ name: 'Not Started', value: 4, color: '#6366f1' }, // indigo-500
];

export function ProjectsOverviewChart() {
	return (
		<div className="flex items-center gap-6">
			<div className="h-40 w-40 shrink-0">
				<ResponsiveContainer width="100%" height="100%">
					<PieChart>
						<Pie
							data={data}
							innerRadius={50}
							outerRadius={70}
							paddingAngle={5}
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

			{/* Custom Legend to match image exactly */}
			<div className="flex flex-col gap-3 flex-1">
				{data.map((item) => (
					<div key={item.name} className="flex items-center justify-between text-sm">
						<div className="flex items-center gap-2">
							<div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
							<span className="text-slate-600">{item.name}</span>
						</div>
						<span className="font-semibold text-slate-900">
							{item.value}{' '}
							<span className="text-slate-400 font-normal">({Math.round((item.value / 24) * 100)}%)</span>
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
