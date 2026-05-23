import { TimeLogEntry } from '../../types/time-log.type';

interface TimeLogListProps {
	logs: TimeLogEntry[];
}

// DUMB SERVER COMPONENT: Simply takes data and renders it. Zero client-side JS.
export function TimeLogList({ logs }: TimeLogListProps) {
	if (!logs || logs.length === 0) {
		return <div className="text-sm text-slate-500 italic py-4">No time logged yet.</div>;
	}

	return (
		<div className="space-y-6">
			{logs.map((log) => (
				<div key={log.id} className="flex items-start gap-4 time-log-item">
					<div className="w-10 pt-0.5 shrink-0">
						<span className="text-sm font-bold text-slate-900">{log.hours}h</span>
					</div>
					<div className="flex-1 space-y-1">
						<p className="text-xs text-slate-500 font-medium">{log.date}</p>
						<p className="text-sm text-slate-700 leading-relaxed">{log.description}</p>
					</div>
				</div>
			))}
		</div>
	);
}
