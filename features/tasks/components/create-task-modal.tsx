'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { AssigneeOption, SprintOption } from '../types/task-form.types';
import { CreateTaskForm } from './form/create-task-form';

// Mock data injection (In production, this would be passed from a global store or SWR/React Query)
const MOCK_SPRINTS: SprintOption[] = [
	{ id: 's1', name: 'Sprint 1 - Setup & Planning' },
	{ id: 's2', name: 'Sprint 2 - Core Development' },
	{ id: 's3', name: 'Sprint 3 - UI/UX' },
];

const MOCK_ASSIGNEES: AssigneeOption[] = [
	{ id: 'a1', name: 'Alex Johnson', initials: 'AJ' },
	{ id: 'a2', name: 'Sarah Williams', initials: 'SW' },
	{ id: 'a3', name: 'Mike Johnson', initials: 'MJ' },
	{ id: 'a4', name: 'Emma Brown', initials: 'EB' },
];

interface CreateTaskModalProps {
	trigger?: React.ReactNode;
}

// CLIENT COMPONENT: Manages the Shadcn Dialog Open/Close state
export function CreateTaskModal({ trigger }: CreateTaskModalProps) {
	const [isOpen, setIsOpen] = useState(false);

	// Default trigger button if none is provided via props
	const defaultTrigger = (
		<Button className="bg-indigo-600 hover:bg-indigo-700 text-white w-full sm:w-auto gap-2 shadow-sm">
			<Plus className="h-4 w-4" /> New Task
		</Button>
	);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>

			<DialogContent className="sm:max-w-[550px] p-0 overflow-hidden bg-white border-slate-200 rounded-2xl shadow-2xl">
				<DialogHeader className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
					<DialogTitle className="text-lg font-bold text-slate-900">Create New Task</DialogTitle>
				</DialogHeader>

				<div className="px-6 py-5">
					<CreateTaskForm
						sprints={MOCK_SPRINTS}
						availableAssignees={MOCK_ASSIGNEES}
						onCancel={() => setIsOpen(false)}
						onSubmitSuccess={() => setIsOpen(false)}
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
}
