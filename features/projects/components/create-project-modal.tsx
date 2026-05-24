'use client';

import { saveProjectAction } from '@/actions/project/project.action';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { useActionState, useEffect } from 'react';

interface ProjectModalProps {
	isOpen: boolean;
	onClose: () => void;
	project: any | null; // Pass your RealProject type here
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
	const isEditing = !!project;
	const [state, formAction, isPending] = useActionState(saveProjectAction, null);

	// Auto-close modal when save is successful
	useEffect(() => {
		if (state?.success) {
			onClose();
		}
	}, [state, onClose]);

	// Format dates for input type="date" if editing
	const formatDate = (dateString?: string) => {
		if (!dateString) return '';
		return new Date(dateString).toISOString().split('T')[0];
	};

	return (
		<Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<DialogContent className="sm:max-w-[500px] bg-white border-slate-100 shadow-xl rounded-2xl">
				<DialogHeader>
					<DialogTitle className="text-xl font-bold text-slate-900">
						{isEditing ? 'Edit Project' : 'Create New Project'}
					</DialogTitle>
					<DialogDescription className="text-sm text-slate-500">
						{isEditing
							? 'Update the details for this project.'
							: 'Fill in the details below to initialize a new project workspace.'}
					</DialogDescription>
				</DialogHeader>

				{state?.error && (
					<div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg">
						{state.error}
					</div>
				)}

				<form action={formAction} className="space-y-4 mt-2">
					{/* Hidden ID input allows the server action to know if it's an update */}
					{isEditing && <input type="hidden" name="id" value={project.id} />}

					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-1.5 col-span-2 sm:col-span-1">
							<label className="text-sm font-semibold text-slate-700">Project Title *</label>
							<Input
								name="title"
								defaultValue={project?.title}
								required
								className="bg-slate-50 border-slate-200"
							/>
						</div>
						<div className="space-y-1.5 col-span-2 sm:col-span-1">
							<label className="text-sm font-semibold text-slate-700">Client Name *</label>
							<Input
								name="client"
								defaultValue={project?.client}
								required
								className="bg-slate-50 border-slate-200"
							/>
						</div>
					</div>

					<div className="space-y-1.5">
						<label className="text-sm font-semibold text-slate-700">Description</label>
						<Textarea
							name="description"
							defaultValue={project?.description}
							className="bg-slate-50 border-slate-200 resize-none h-20"
						/>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-1.5">
							<label className="text-sm font-semibold text-slate-700">Start Date *</label>
							<Input
								name="startDate"
								type="date"
								defaultValue={formatDate(project?.startDate)}
								required
								className="bg-slate-50 border-slate-200"
							/>
						</div>
						<div className="space-y-1.5">
							<label className="text-sm font-semibold text-slate-700">End Date *</label>
							<Input
								name="endDate"
								type="date"
								defaultValue={formatDate(project?.endDate)}
								required
								className="bg-slate-50 border-slate-200"
							/>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-1.5">
							<label className="text-sm font-semibold text-slate-700">Budget ($)</label>
							<Input
								name="budget"
								type="number"
								defaultValue={project?.budget}
								min="0"
								step="0.01"
								className="bg-slate-50 border-slate-200"
							/>
						</div>
						<div className="space-y-1.5">
							<label className="text-sm font-semibold text-slate-700">Status</label>
							<select
								name="status"
								defaultValue={project?.status || 'PLANNED'}
								className="flex h-10 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
							>
								<option value="PLANNED">Planned</option>
								<option value="ACTIVE">Active</option>
								<option value="COMPLETED">Completed</option>
								<option value="ARCHIVED">Archived</option>
							</select>
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
							{isPending ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Project'}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
