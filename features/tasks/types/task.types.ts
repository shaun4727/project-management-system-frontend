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
	hours: number;
	description: string;
	date: string;
}

export interface TaskDetailsData {
	id: string;
	title: string;
	status: string;
	sprint: string;
	assignees: Assignee[];
	priority: 'High' | 'Medium' | 'Low';
	estimatedHours: number;
	loggedHours: number;
	description: string;
	subtasks: Subtask[];
	comments: Comment[];
	timeLogs: TimeLog[];
}
