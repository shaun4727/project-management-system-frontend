export interface DashboardStats {
	totalProjects: number;
	activeTasks: number;
	tasksCompleted: number;
	totalHoursLogged: number;
}

export interface Activity {
	id: string;
	user: {
		name: string;
		initials: string;
	};
	action: string;
	time: string;
}

export interface DashboardSummaryResponse {
	success: boolean;
	data: {
		stats: DashboardStats;
		overview: {
			completed: number;
			inProgress: number;
			notStarted: number;
		};
		recentActivity: Activity[];
		// You can add myTasks and productivity array types here as your API expands
	};
}
