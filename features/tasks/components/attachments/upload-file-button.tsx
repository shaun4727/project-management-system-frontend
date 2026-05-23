'use client';

import { Button } from '@/components/ui/button';
import { Loader2, UploadCloud } from 'lucide-react';
import { useRef, useState } from 'react';

interface UploadFileButtonProps {
	taskId: string;
}

// SMART CLIENT COMPONENT: Handles file system interaction and upload state
export function UploadFileButton({ taskId }: UploadFileButtonProps) {
	const [isUploading, setIsUploading] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setIsUploading(true);

		// Simulate API Upload (In production: append to FormData and dispatch thunk)
		// const formData = new FormData();
		// formData.append('file', file);
		// await dispatch(uploadAttachment({ taskId, formData }));

		setTimeout(() => {
			setIsUploading(false);
			if (fileInputRef.current) fileInputRef.current.value = '';
		}, 1500);
	};

	return (
		<div>
			<input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" aria-hidden="true" />
			<Button
				onClick={() => fileInputRef.current?.click()}
				disabled={isUploading}
				className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm gap-2 h-9 px-4 rounded-lg"
			>
				{isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />}
				<span className="hidden sm:inline">Upload File</span>
				<span className="sm:hidden">Upload</span>
			</Button>
		</div>
	);
}
