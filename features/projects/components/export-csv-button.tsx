'use client';

import { exportProjectTasksCsvAction } from '@/actions/project/project.action';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { useState } from 'react';

export function ExportCsvButton({ projectId }: { projectId: string }) {
	const [isExporting, setIsExporting] = useState(false);

	const handleExport = async () => {
		setIsExporting(true);

		try {
			const response = await exportProjectTasksCsvAction(projectId);

			if (!response.success || !response.data) {
				// Consider replacing this with a toast notification (e.g., sonner or react-hot-toast)
				alert(response.error || 'Failed to export CSV');
				return;
			}

			// 1. Create a Blob from the CSV text string
			const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });
			const url = window.URL.createObjectURL(blob);

			// 2. Create a temporary hidden anchor tag
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', response.filename || `tasks-${projectId}.csv`);
			document.body.appendChild(link);

			// 3. Trigger the download
			link.click();

			// 4. Clean up the DOM and clear memory
			document.body.removeChild(link);
			window.URL.revokeObjectURL(url);
		} catch (error) {
			console.error('Export failed:', error);
			alert('An unexpected error occurred while downloading.');
		} finally {
			setIsExporting(false);
		}
	};

	return (
		<Button
			variant="outline"
			onClick={handleExport}
			disabled={isExporting}
			className="gap-2 bg-white text-slate-700 border-slate-200 hover:bg-slate-50 transition-colors w-[130px]"
		>
			{/* Swap icon for a loading spinner when exporting */}
			{isExporting ? (
				<Loader2 className="h-4 w-4 animate-spin text-slate-500" />
			) : (
				<Download className="h-4 w-4" />
			)}
			{isExporting ? 'Exporting...' : 'Export CSV'}
		</Button>
	);
}
