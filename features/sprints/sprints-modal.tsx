'use client';

import { saveSprintAction } from '@/actions/sprint.actions';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { useActionState, useEffect } from 'react';

interface Sprint {
	id: string;
	title: string;
	sprintNumber: number;
	startDate: string;
	endDate: string;
	projectId: string;
}

interface SprintModalProps {
	isOpen: boolean;
	onClose: () => void;
	projectId: string; // Crucial: Always need to know which project this belongs to
	sprint: Sprint | null; // Pass sprint data if editing, null if creating
}

export function SprintModal({ isOpen, onClose, projectId, sprint }: SprintModalProps) {
	const isEditing = !!sprint;
	const [state, formAction, isPending] = useActionState(saveSprintAction, null);

	// Auto-close modal when save is successful
	useEffect(() => {
		if (state?.success) {
			onClose();
		}
	}, [state, onClose]);

	// Format ISO dates back to YYYY-MM-DD for the HTML date inputs
	const formatDate = (dateString?: string) => {
		if (!dateString) return '';
		return new Date(dateString).toISOString().split('T')[0];
	};

	return (
		<Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<DialogContent className="sm:max-w-[425px] bg-white border-slate-100 shadow-xl rounded-2xl">
				<DialogHeader>
					<DialogTitle className="text-xl font-bold text-slate-900">
						{isEditing ? 'Edit Sprint' : 'Create New Sprint'}
					</DialogTitle>
					<DialogDescription className="text-sm text-slate-500">
						{isEditing
							? 'Update the timeframe and details for this sprint.'
							: 'Define a new sprint cycle for this project.'}
					</DialogDescription>
				</DialogHeader>

				{state?.error && (
					<div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg">
						{state.error}
					</div>
				)}

				<form action={formAction} className="space-y-4 mt-2">
					{/* Hidden Inputs for Server Action Payload */}
					{isEditing && <input type="hidden" name="id" value={sprint.id} />}
					<input type="hidden" name="projectId" value={projectId} />

					<div className="grid grid-cols-4 gap-4">
						<div className="space-y-1.5 col-span-3">
							<label className="text-sm font-semibold text-slate-700">Sprint Title *</label>
							<Input
								name="title"
								defaultValue={sprint?.title}
								placeholder="e.g. Core Development"
								required
								className="bg-slate-50 border-slate-200"
							/>
						</div>
						<div className="space-y-1.5 col-span-1">
							<label className="text-sm font-semibold text-slate-700">No. *</label>
							<Input
								name="sprintNumber"
								type="number"
								min="1"
								defaultValue={sprint?.sprintNumber}
								required
								className="bg-slate-50 border-slate-200"
							/>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-1.5">
							<label className="text-sm font-semibold text-slate-700">Start Date *</label>
							<Input
								name="startDate"
								type="date"
								defaultValue={formatDate(sprint?.startDate)}
								required
								className="bg-slate-50 border-slate-200"
							/>
						</div>
						<div className="space-y-1.5">
							<label className="text-sm font-semibold text-slate-700">End Date *</label>
							<Input
								name="endDate"
								type="date"
								defaultValue={formatDate(sprint?.endDate)}
								required
								className="bg-slate-50 border-slate-200"
							/>
						</div>
					</div>

					<div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
						<Button type="button" variant="ghost" onClick={onClose} className="text-slate-500">
							Cancel
						</Button>
						<Button
							type="submit"
							disabled={isPending}
							className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[120px]"
						>
							{isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
							{isPending ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Sprint'}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
