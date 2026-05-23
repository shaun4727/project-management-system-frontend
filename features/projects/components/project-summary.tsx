import { SummaryProps } from '../types/project.types';

// Server Component
export function ProjectSummary({ stats }: SummaryProps) {
	const rows = [
		{ label: 'Total Tasks', value: stats.total, isBold: true },
		{ label: 'Completed', value: stats.completed },
		{ label: 'In Progress', value: stats.inProgress },
		{ label: 'Review Required', value: stats.reviewRequired },
		{ label: 'Todo', value: stats.todo },
	];

	return (
		<div className="flex flex-col h-full justify-between gap-4">
			{rows.map((row, i) => (
				<div
					key={row.label}
					className={`flex items-center justify-between text-sm ${i !== rows.length - 1 ? 'border-b border-slate-100 pb-3' : ''}`}
				>
					<span className="text-slate-600 font-medium">{row.label}</span>
					<span className={`text-slate-900 ${row.isBold ? 'font-bold' : 'font-semibold'}`}>{row.value}</span>
				</div>
			))}
		</div>
	);
}
