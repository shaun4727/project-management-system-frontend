'use client';

import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

interface CompletionChartProps {
	percentage: number;
}

export function CompletionChart({ percentage }: CompletionChartProps) {
	const data = [
		{ name: 'Completed', value: percentage, color: '#4f46e5' }, // indigo-600
		{ name: 'Remaining', value: 100 - percentage, color: '#f1f5f9' }, // slate-100
	];

	return (
		<div className="flex flex-col items-center justify-center h-full">
			<div className="relative h-40 w-40">
				<ResponsiveContainer width="100%" height="100%">
					<PieChart>
						<Pie
							data={data}
							innerRadius={60}
							outerRadius={75}
							startAngle={90}
							endAngle={-270}
							dataKey="value"
							stroke="none"
						>
							{data.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={entry.color} />
							))}
						</Pie>
					</PieChart>
				</ResponsiveContainer>
				{/* Centered Text */}
				<div className="absolute inset-0 flex flex-col items-center justify-center">
					<span className="text-3xl font-bold text-slate-900">{percentage}%</span>
					<span className="text-xs text-slate-500 font-medium">Completed</span>
				</div>
			</div>
			<p className="text-xs text-slate-500 mt-4">{percentage}% completed out of all tasks</p>
		</div>
	);
}
