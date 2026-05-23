export type FileExtension = 'pdf' | 'docx' | 'png' | 'jpg' | 'other';

export interface AttachmentData {
	id: string;
	fileName: string;
	fileSize: string; // e.g., "1.2 MB"
	uploadedAt: string; // e.g., "May 22, 10:30 AM"
	extension: FileExtension;
	url: string;
}
