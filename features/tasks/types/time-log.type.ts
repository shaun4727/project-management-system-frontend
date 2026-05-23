export interface TimeLogEntry {
	id: string;
	hours: number;
	date: string;
	description: string;
}

export interface LogTimeFormData {
	hours: number | '';
	description: string;
}
