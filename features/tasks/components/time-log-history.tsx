import { TimeLog } from '../types/task.types';

interface TimeLogHistoryProps {
	logs: TimeLog[];
}

// DUMB COMPONENT (Server-friendly)
export function TimeLogHistory({ logs = [] }: TimeLogHistoryProps) {
	return (
		<div className="mt-2">
			<h3 className="text-lg font-bold text-slate-900 mb-6">Time Logs</h3>

			<div className="space-y-4">
				{logs.length === 0 ? (
					<p className="text-sm text-slate-500 py-4 text-center border border-dashed border-slate-200 rounded-xl">
						No time has been logged for this task yet.
					</p>
				) : (
					logs.map((log) => (
						<div key={log.id} className="flex gap-4">
							{/* Hours Badge */}
							<div className="w-14 shrink-0 text-sm font-bold text-amber-700 bg-amber-50 rounded-xl flex items-center justify-center py-2.5 h-fit border border-amber-100 shadow-sm">
								{log.hoursLogged}h
							</div>

							{/* Details Bubble */}
							<div className="flex-1 bg-slate-50 rounded-2xl rounded-tl-none p-4 border border-slate-100 relative">
								<div className="flex items-center justify-between mb-1.5 flex-wrap gap-2">
									<span className="text-sm font-semibold text-slate-900">
										{log.user?.name || 'Unknown User'}
									</span>
									<span className="text-xs font-medium text-slate-400">
										{new Date(log.createdAt).toLocaleDateString('en-US', {
											month: 'short',
											day: 'numeric',
											year: 'numeric',
											hour: '2-digit',
											minute: '2-digit',
										})}
									</span>
								</div>
								<p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
									{log.description}
								</p>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
}
