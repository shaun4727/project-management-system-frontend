'use client';

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

interface ProjectsOverviewChartProps {
	data: {
		totalProjects: number;
		activeTasks: number;
		completedTasks: number;
	};
}

export function ProjectsOverviewChart({ data }: ProjectsOverviewChartProps) {
	// Format the data for Recharts
	const chartData = [
		{ name: 'Active Tasks', value: data.activeTasks, color: '#4f46e5' }, // Indigo-600
		{ name: 'Completed Tasks', value: data.completedTasks, color: '#10b981' }, // Emerald-500
	];

	// If there are zero tasks, show a fallback state so the chart isn't just blank
	const totalTasks = data.activeTasks + data.completedTasks;
	if (totalTasks === 0) {
		return (
			<div className="flex flex-col items-center justify-center h-full text-slate-400">
				<span className="text-sm font-medium">No tasks available to chart</span>
			</div>
		);
	}

	return (
		<div className="w-full h-full min-h-[250px]">
			<ResponsiveContainer width="100%" height="100%">
				<PieChart>
					<Pie
						data={chartData}
						cx="50%"
						cy="50%"
						innerRadius={60} // This creates the "Doughnut" hole
						outerRadius={80}
						paddingAngle={5}
						dataKey="value"
						stroke="none"
					>
						{chartData.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={entry.color} />
						))}
					</Pie>
					<Tooltip
						contentStyle={{
							borderRadius: '12px',
							border: '1px solid #f1f5f9',
							boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
							fontWeight: 500,
						}}
						itemStyle={{ color: '#1e293b' }}
					/>
					<Legend
						verticalAlign="bottom"
						height={36}
						iconType="circle"
						formatter={(value, entry: any) => (
							<span className="text-sm font-medium text-slate-600 ml-1">{value}</span>
						)}
					/>
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
}
