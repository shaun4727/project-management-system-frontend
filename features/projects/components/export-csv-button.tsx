'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useState } from 'react';

export function ExportCsvButton({ projectId }: { projectId: string }) {
	const [isExporting, setIsExporting] = useState(false);

	const handleExport = async () => {
		setIsExporting(true);
		// In production: await api.get(`/projects/${projectId}/export/tasks`)
		setTimeout(() => setIsExporting(false), 1000);
	};

	return (
		<Button
			variant="outline"
			onClick={handleExport}
			disabled={isExporting}
			className="gap-2 bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
		>
			<Download className="h-4 w-4" />
			{isExporting ? 'Exporting...' : 'Export CSV'}
		</Button>
	);
}
