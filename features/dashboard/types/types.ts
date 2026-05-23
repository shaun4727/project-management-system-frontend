export interface DashboardStats {
	totalProjects: number;
	activeTasks: number;
	completedTasks: number;
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
		overview: DashboardStats;
		recentActivity: Activity[];
		// You can add myTasks and productivity array types here as your API expands
	};
}
