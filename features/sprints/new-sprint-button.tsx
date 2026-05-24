'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { SprintModal } from './sprints-modal';

interface NewSprintButtonProps {
	projectId: string;
}

export function NewSprintButton({ projectId }: NewSprintButtonProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalKey, setModalKey] = useState(0);

	const handleOpen = () => {
		setModalKey((prev) => prev + 1); // Force a fresh mount on every open
		setIsModalOpen(true);
	};

	return (
		<>
			<Button onClick={handleOpen} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm gap-2">
				<Plus className="h-4 w-4" /> New Sprint
			</Button>

			<SprintModal
				key={modalKey}
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				projectId={projectId}
				sprint={null} // Hardcoded to null because this button is strictly for creating
			/>
		</>
	);
}
