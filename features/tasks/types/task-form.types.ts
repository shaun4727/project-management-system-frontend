export interface SprintOption {
	id: string;
	name: string;
}

export interface AssigneeOption {
	id: string;
	name: string;
	avatarUrl?: string;
	initials: string;
}

export interface CreateTaskFormData {
	title: string;
	sprintId: string;
	description: string;
	priority: 'High' | 'Medium' | 'Low';
	estimateHours: number | '';
	assigneeIds: string[];
}
