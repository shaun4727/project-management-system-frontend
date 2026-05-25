'use client';

import { FileIcon, FileText, ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface Attachment {
	id: string;
	fileName: string;
	fileUrl: string;
	createdAt: string;
}

interface TaskAttachmentsTabProps {
	attachments: Attachment[];
}

export function TaskAttachmentsTab({ attachments = [] }: TaskAttachmentsTabProps) {
	if (attachments.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-12 px-4 border border-dashed border-slate-200 rounded-2xl bg-slate-50">
				<FileIcon className="h-10 w-10 text-slate-300 mb-3" />
				<p className="text-sm font-medium text-slate-600">No attachments found</p>
				<p className="text-xs text-slate-400 mt-1">Files uploaded to this task will appear here.</p>
			</div>
		);
	}

	const isImage = (fileName: string) => {
		return /\.(jpg|jpeg|png|gif|webp)$/i.test(fileName);
	};

	// Helper to safely construct the full URL to the Express backend
	const getFullUrl = (path: string) => {
		if (!path) return '';
		// If it's already a full URL (like from an S3 bucket later), return it as is
		if (path.startsWith('http')) return path;

		// Ensure clean concatenation by removing double slashes
		const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || '';
		const cleanPath = path.startsWith('/') ? path : `/${path}`;

		return `${baseUrl}${cleanPath}`;
	};

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{attachments.map((file) => {
				const imageFile = isImage(file.fileName);
				const fullUrl = getFullUrl(file.fileUrl);

				return (
					<a
						key={file.id}
						href={fullUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="group flex flex-col bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-200"
					>
						{/* File Preview Area */}
						<div className="h-32 bg-slate-50 relative flex items-center justify-center border-b border-slate-100 overflow-hidden">
							{imageFile ? (
								<Image
									src={fullUrl}
									alt={file.fileName}
									fill
									unoptimized // Prevents Next.js "Invalid src hostname" errors
									className="object-cover group-hover:scale-105 transition-transform duration-300"
								/>
							) : (
								<FileText className="h-10 w-10 text-indigo-300" />
							)}
						</div>

						{/* File Info Area */}
						<div className="p-3 flex items-start gap-3">
							<div className="mt-0.5 shrink-0">
								{imageFile ? (
									<ImageIcon className="h-4 w-4 text-indigo-500" />
								) : (
									<FileIcon className="h-4 w-4 text-rose-500" />
								)}
							</div>
							<div className="min-w-0 flex-1">
								<p className="text-sm font-semibold text-slate-700 truncate group-hover:text-indigo-600 transition-colors">
									{file.fileName}
								</p>
								<p className="text-xs text-slate-400 mt-0.5">
									{new Date(file.createdAt).toLocaleDateString('en-US', {
										month: 'short',
										day: 'numeric',
										year: 'numeric',
									})}
								</p>
							</div>
						</div>
					</a>
				);
			})}
		</div>
	);
}
