import { TimeLog } from '../types/task.types';

interface TimeLogHistoryProps {
	logs: TimeLog[];
}

// DUMB COMPONENT (Server-friendly)
export function TimeLogHistory({ logs }: TimeLogHistoryProps) {
	return (
		<div className="mt-8">
			<h3 className="text-sm font-bold text-slate-900 mb-4">Time Logs</h3>
			<div className="space-y-5">
				{logs.map((log) => (
					<div key={log.id} className="flex gap-4">
						<div className="w-10 text-sm font-bold text-slate-900 pt-0.5">{log.hours}h</div>
						<div className="flex-1">
							<p className="text-xs text-slate-500 font-medium mb-1">{log.date}</p>
							<p className="text-sm text-slate-700">{log.description}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
