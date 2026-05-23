import { AttachmentData } from '../../types/attachment.type';
import { AnimatedAttachmentList } from './animated-attachment-list';
import { AttachmentItem } from './attachment-item';
import { UploadFileButton } from './upload-file-button';

interface AttachmentsSectionProps {
	taskId: string;
}

// MOCK DATA (In production, this is fetched from the database)
const mockAttachments: AttachmentData[] = [
	{
		id: 'f1',
		fileName: 'Design System.pdf',
		fileSize: '1.2 MB',
		uploadedAt: 'May 22, 10:30 AM',
		extension: 'pdf',
		url: '#',
	},
	{
		id: 'f2',
		fileName: 'API Documentation.docx',
		fileSize: '2.4 MB',
		uploadedAt: 'May 21, 3:15 PM',
		extension: 'docx',
		url: '#',
	},
	{
		id: 'f3',
		fileName: 'Screenshot 2024-05-22.png',
		fileSize: '856 KB',
		uploadedAt: 'May 20, 5:45 PM',
		extension: 'png',
		url: '#',
	},
];

// SERVER COMPONENT: Orchestrates the layout and fetches data
export default async function AttachmentsSection({ taskId }: AttachmentsSectionProps) {
	// In production: const attachments = await fetchAttachmentsForTask(taskId);
	const attachments = mockAttachments;

	return (
		<div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm w-full max-w-xl">
			{/* Header Section */}
			<div className="flex items-center justify-between">
				<h3 className="text-base font-bold text-slate-900">Attachments</h3>

				{/* Client Component injected for interactivity */}
				<UploadFileButton taskId={taskId} />
			</div>

			{/* List Section */}
			{attachments.length > 0 ? (
				<AnimatedAttachmentList>
					{/* Server-rendered items passed as children to the Client animator */}
					{attachments.map((file) => (
						<AttachmentItem key={file.id} attachment={file} />
					))}
				</AnimatedAttachmentList>
			) : (
				<div className="mt-8 text-center py-8 border-2 border-dashed border-slate-100 rounded-xl">
					<p className="text-sm text-slate-500">No attachments yet.</p>
				</div>
			)}
		</div>
	);
}
