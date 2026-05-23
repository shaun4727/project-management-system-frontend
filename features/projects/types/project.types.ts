// types.ts
export type ProjectStatus = 'Active' | 'In Progress' | 'Planned' | 'Review' | 'Completed';

export interface Project {
	id: string;
	name: string;
	description: string;
	client: string;
	status: ProjectStatus;
	progress: number;
	startDate: string;
	endDate: string;
	timeLeft: string;
	tasksCompleted: number;
	tasksTotal: number;
	team: string[]; // Array of avatar image URLs
	extraTeamCount?: number;
	budget: number;
	iconColor: string;
}

// mockData.ts

export const mockProjects: Project[] = [
	{
		id: '1',
		name: 'Website Redesign',
		description: 'Modernize corporate website',
		client: 'TechNova Inc.',
		status: 'Active',
		progress: 68,
		startDate: 'Apr 20',
		endDate: 'Aug 15, 2024',
		timeLeft: '3 months left',
		tasksCompleted: 24,
		tasksTotal: 35,
		team: ['/avatars/1.png', '/avatars/2.png', '/avatars/3.png'],
		extraTeamCount: 3,
		budget: 24000,
		iconColor: 'bg-purple-600',
	},
	{
		id: '2',
		name: 'Mobile App Development',
		description: 'iOS & Android application',
		client: 'Bright Solutions',
		status: 'In Progress',
		progress: 42,
		startDate: 'Feb 10',
		endDate: 'Jul 10, 2024',
		timeLeft: '1 month left',
		tasksCompleted: 18,
		tasksTotal: 42,
		team: ['/avatars/4.png', '/avatars/5.png', '/avatars/6.png'],
		extraTeamCount: 5,
		budget: 48500,
		iconColor: 'bg-orange-500',
	},
	{
		id: '3',
		name: 'Mobile App Development',
		description: 'iOS & Android application',
		client: 'Bright Solutions',
		status: 'In Progress',
		progress: 42,
		startDate: 'Feb 10',
		endDate: 'Jul 10, 2024',
		timeLeft: '1 month left',
		tasksCompleted: 18,
		tasksTotal: 42,
		team: ['/avatars/4.png', '/avatars/5.png', '/avatars/6.png'],
		extraTeamCount: 5,
		budget: 48500,
		iconColor: 'bg-orange-500',
	},
	{
		id: '4',
		name: 'Mobile App Development',
		description: 'iOS & Android application',
		client: 'Bright Solutions',
		status: 'In Progress',
		progress: 42,
		startDate: 'Feb 10',
		endDate: 'Jul 10, 2024',
		timeLeft: '1 month left',
		tasksCompleted: 18,
		tasksTotal: 42,
		team: ['/avatars/4.png', '/avatars/5.png', '/avatars/6.png'],
		extraTeamCount: 5,
		budget: 48500,
		iconColor: 'bg-orange-500',
	},
	// Add other projects to match the image...
];
