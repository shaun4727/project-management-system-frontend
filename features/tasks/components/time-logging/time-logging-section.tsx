import { TimeLogEntry } from '../../types/time-log.type';
import { LogTimeForm } from '../log-time-form';
import { AnimatedTimeLogSection } from './animated-time-log-section';
import { TimeLogList } from './time-log-list';

interface TimeLoggingSectionProps {
	taskId: string;
}

// MOCK DATA (In production, this is fetched from your PostgreSQL database via Prisma/Fetch)
const mockTimeLogs: TimeLogEntry[] = [
	{
		id: 'tl1',
		hours: 2.5,
		date: 'May 22, 10:30 AM',
		description: 'Fixed the authentication bug.',
	},
	{
		id: 'tl2',
		hours: 3,
		date: 'May 21, 2:15 PM',
		description: 'Implemented login API.',
	},
	{
		id: 'tl3',
		hours: 1.5,
		date: 'May 20, 11:00 AM',
		description: 'Setup auth service.',
	},
];

// SERVER COMPONENT: Orchestrates the layout structure and fetches the data
export default async function TimeLoggingSection({ taskId }: TimeLoggingSectionProps) {
	// In production: const timeLogs = await fetchTimeLogsForTask(taskId);
	const timeLogs = mockTimeLogs;

	return (
		<AnimatedTimeLogSection>
			<div className="grid grid-cols-1 md:grid-cols-2">
				{/* Left Column: Log Time Form */}
				<div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-slate-100">
					<h2 className="text-base font-bold text-slate-900 mb-6">Log Time</h2>
					{/* Smart Client Component */}
					<LogTimeForm taskId={taskId} />
				</div>

				{/* Right Column: Time Logs History */}
				<div className="p-6 md:p-8 bg-slate-50/30">
					<h2 className="text-base font-bold text-slate-900 mb-6">Time Logs</h2>
					{/* Dumb Server Component */}
					<TimeLogList logs={timeLogs} />
				</div>
			</div>
		</AnimatedTimeLogSection>
	);
}
