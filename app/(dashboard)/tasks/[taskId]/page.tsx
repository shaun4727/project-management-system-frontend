import { TaskDetailsView } from '@/features/tasks/components/task-details-view';
import { TaskDetailsData } from '@/features/tasks/types/task.types';

// SERVER COMPONENT (Fetches Mock Data)
export default function TaskDetailsPage() {
	const mockTask: TaskDetailsData = {
		id: '1',
		title: 'API Integration',
		status: 'In Progress',
		sprint: 'Sprint 2 - Core Development',
		assignees: [
			{ id: '1', name: 'Alex Johnson', initials: 'AJ' },
			{ id: '2', name: 'John Doe', initials: 'JD' },
		],
		priority: 'High',
		estimatedHours: 8,
		loggedHours: 4.5,
		description:
			'Integrate backend APIs with frontend application. Implement authentication, user management, and data fetching.',
		subtasks: [
			{ id: 's1', title: 'Setup API client', completed: true },
			{ id: 's2', title: 'Implement auth endpoints', completed: true },
			{ id: 's3', title: 'User management API', completed: true },
			{ id: 's4', title: 'Error handling', completed: true },
		],
		comments: [
			{
				id: 'c1',
				author: { id: '2', name: 'John Doe', initials: 'JD' },
				text: "I've completed the auth integration part.",
				timestamp: '2h ago',
			},
			{
				id: 'c2',
				author: { id: '3', name: 'Sarah Williams', initials: 'SW' },
				text: 'Looks good! Can you also add loading states?',
				timestamp: '1h ago',
			},
			{
				id: 'c3',
				author: { id: '2', name: 'John Doe', initials: 'JD' },
				text: 'Sure, working on it.',
				timestamp: '1h ago',
			},
		],
		timeLogs: [
			{ id: 'l1', hours: 2.5, date: 'May 22, 10:30 AM', description: 'Implemented user management API' },
			{ id: 'l2', hours: 2, date: 'May 21, 3:15 PM', description: 'Setup auth integration' },
		],
	};

	return (
		<div>
			{/* In production, this would be wrapped inside a Dialog/Modal portal rather than a raw div */}
			<TaskDetailsView task={mockTask} />
		</div>
	);
}
