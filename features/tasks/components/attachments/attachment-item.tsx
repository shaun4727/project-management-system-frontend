import { Button } from '@/components/ui/button';
import { CloudDownload, File, FileText, Image as ImageIcon, MoreVertical } from 'lucide-react';
import { AttachmentData } from '../../types/attachment.type';

interface AttachmentItemProps {
	attachment: AttachmentData;
}

// DUMB COMPONENT: Can be rendered purely on the server.
export function AttachmentItem({ attachment }: AttachmentItemProps) {
	// Determine icon and color based on file extension
	const getFileStyle = (ext: string) => {
		switch (ext) {
			case 'pdf':
				return { icon: FileText, bg: 'bg-red-50', text: 'text-red-500' };
			case 'docx':
				return { icon: FileText, bg: 'bg-blue-50', text: 'text-blue-500' };
			case 'png':
			case 'jpg':
				return { icon: ImageIcon, bg: 'bg-purple-50', text: 'text-purple-500' };
			default:
				return { icon: File, bg: 'bg-slate-50', text: 'text-slate-500' };
		}
	};

	const { icon: Icon, bg, text } = getFileStyle(attachment.extension);

	return (
		<div className="flex items-center justify-between p-2 group hover:bg-slate-50 rounded-xl transition-colors attachment-row">
			<div className="flex items-center gap-4 min-w-0">
				<div className={`h-10 w-10 shrink-0 flex items-center justify-center rounded-lg ${bg} ${text}`}>
					<Icon className="h-5 w-5" />
				</div>

				<div className="min-w-0 flex-1">
					<p className="text-sm font-semibold text-slate-900 truncate">{attachment.fileName}</p>
					<div className="flex items-center text-xs text-slate-500 mt-0.5">
						<span>{attachment.fileSize}</span>
						<span className="mx-1.5">•</span>
						<span>{attachment.uploadedAt}</span>
					</div>
				</div>
			</div>

			<div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
				<Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-indigo-600">
					<CloudDownload className="h-4 w-4" />
					<span className="sr-only">Download {attachment.fileName}</span>
				</Button>
				<Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-700">
					<MoreVertical className="h-4 w-4" />
					<span className="sr-only">More options</span>
				</Button>
			</div>
		</div>
	);
}
