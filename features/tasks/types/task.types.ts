export interface Assignee {
	id: string;
	name: string;
	avatarUrl?: string;
	initials: string;
}

export interface Subtask {
	id: string;
	title: string;
	completed: boolean;
}

export interface Comment {
	id: string;
	author: Assignee;
	text: string;
	timestamp: string;
}

export interface TimeLog {
	id: string;
	hoursLogged: number;
	description: string;
	createdAt: string; // Changed from 'date' to 'createdAt'
	taskId: string;
	userId: string;
	user?: {
		id: string;
		name: string;
	};
}

export interface TaskDetailsData {
	id: string;
	title: string;
	status: string;

	// FIX: Sprint is now an object, or null if it's in the backlog
	sprint: {
		id?: string;
		title: string;
		sprintNumber: number;
	} | null;

	assignees: Assignee[];
	priority: 'HIGH' | 'MEDIUM' | 'LOW'; // Ensure these match your Prisma enums
	estimatedHours: number;
	loggedHours: number;
	description: string;
	subtasks: Subtask[];
	comments: Comment[];
	timeLogs: TimeLog[];

	// FIX: Also updated attachments from an empty array `[]` to an array of objects
	attachments: {
		id: string;
		fileName: string;
		fileUrl: string;
		createdAt: string;
	}[];
}
