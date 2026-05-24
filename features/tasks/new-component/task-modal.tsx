'use client';

import { saveTaskAction } from '@/actions/task.actions';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { useActionState, useEffect, useState } from 'react';

interface TaskModalProps {
	isOpen: boolean;
	onClose: () => void;
	task: any | null;
	projects: any[];
	sprints: any[];
	users: any[];
}

export function TaskModal({ isOpen, onClose, task, projects = [], sprints = [], users = [] }: TaskModalProps) {
	const isEditing = !!task;
	const [state, formAction, isPending] = useActionState(saveTaskAction, null);

	// Track selected project to filter the sprints dropdown
	const [selectedProjectId, setSelectedProjectId] = useState<string>(task?.projectId || '');

	useEffect(() => {
		if (state?.success) onClose();
	}, [state, onClose]);

	// Reset local state when opening for a new/different task
	useEffect(() => {
		if (isOpen) setSelectedProjectId(task?.projectId || '');
	}, [isOpen, task]);

	const formatDate = (dateString?: string) => {
		return dateString ? new Date(dateString).toISOString().split('T')[0] : '';
	};

	// Filter sprints to only show those belonging to the selected project
	const filteredSprints = sprints.filter((sprint) => sprint.projectId === selectedProjectId);

	return (
		<Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
			{/* Widened the modal slightly to sm:max-w-[700px] to comfortably fit 3 columns */}
			<DialogContent className="sm:max-w-[700px] bg-white border-slate-100 shadow-xl rounded-2xl">
				<DialogHeader>
					<DialogTitle className="text-xl font-bold text-slate-900">
						{isEditing ? 'Edit Task' : 'Create New Task'}
					</DialogTitle>
					<DialogDescription className="text-sm text-slate-500">
						{isEditing ? 'Update task details and timeline.' : 'Add a new task to your workspace.'}
					</DialogDescription>
				</DialogHeader>

				{state?.error && (
					<div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100">
						{state.error}
					</div>
				)}

				<form action={formAction} className="space-y-5 mt-2">
					{isEditing && <input type="hidden" name="id" value={task.id} />}

					{/* Row 1: Title */}
					<div className="space-y-1.5">
						<label className="text-sm font-semibold text-slate-700">Task Title *</label>
						<Input
							name="title"
							defaultValue={task?.title}
							required
							className="bg-slate-50"
							placeholder="e.g. Setup Database Schema"
						/>
					</div>

					{/* Row 2: Project & Sprint */}
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-1.5">
							<label className="text-sm font-semibold text-slate-700">Project</label>
							<select
								name="projectId"
								value={selectedProjectId}
								onChange={(e) => setSelectedProjectId(e.target.value)}
								className="flex h-10 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500/20"
							>
								<option value="">No Project</option>
								{projects.map((p) => (
									<option key={p.id} value={p.id}>
										{p.title}
									</option>
								))}
							</select>
						</div>
						<div className="space-y-1.5">
							<label className="text-sm font-semibold text-slate-700">Sprint</label>
							<select
								name="sprintId"
								defaultValue={task?.sprintId}
								disabled={!selectedProjectId}
								className="flex h-10 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm disabled:opacity-50"
							>
								<option value="">
									{selectedProjectId ? 'Backlog (No Sprint)' : 'Select a Project first'}
								</option>
								{filteredSprints.map((s) => (
									<option key={s.id} value={s.id}>
										Sprint {s.sprintNumber}: {s.title}
									</option>
								))}
							</select>
						</div>
					</div>

					{/* Row 3: Assignee, Estimate Hours, Status */}
					<div className="grid grid-cols-3 gap-4">
						<div className="space-y-1.5">
							<label className="text-sm font-semibold text-slate-700">Assignee</label>
							<select
								name="assigneeId"
								defaultValue={task?.assignees?.[0]?.id || task?.assigneeId || ''}
								className="flex h-10 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500/20"
							>
								<option value="">Unassigned</option>
								{users.map((u) => (
									<option key={u.id} value={u.id}>
										{u.name}
									</option>
								))}
							</select>
						</div>
						<div className="space-y-1.5">
							<label className="text-sm font-semibold text-slate-700">Est. Hours</label>
							<Input
								name="estimateHours"
								type="number"
								step="0.5"
								min="0"
								placeholder="e.g. 4.5"
								defaultValue={task?.estimateHours}
								className="bg-slate-50"
							/>
						</div>
						<div className="space-y-1.5">
							<label className="text-sm font-semibold text-slate-700">Status</label>
							<select
								name="status"
								defaultValue={task?.status || 'TODO'}
								className="flex h-10 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
							>
								<option value="TODO">To Do</option>
								<option value="IN_PROGRESS">In Progress</option>
								<option value="REVIEW_REQUIRED">Review Required</option>
								<option value="DONE">Done</option>
							</select>
						</div>
					</div>

					{/* Row 4: Priority, Start Date, Due Date */}
					<div className="grid grid-cols-3 gap-4">
						<div className="space-y-1.5">
							<label className="text-sm font-semibold text-slate-700">Priority</label>
							<select
								name="priority"
								defaultValue={task?.priority || 'MEDIUM'}
								className="flex h-10 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
							>
								<option value="LOW">Low</option>
								<option value="MEDIUM">Medium</option>
								<option value="HIGH">High</option>
							</select>
						</div>

						<div className="space-y-1.5">
							<label className="text-sm font-semibold text-slate-700">Due Date</label>
							<Input
								name="dueDate"
								type="date"
								defaultValue={formatDate(task?.dueDate)}
								className="bg-slate-50"
							/>
						</div>
					</div>

					{/* Row 5: Description */}
					<div className="space-y-1.5">
						<label className="text-sm font-semibold text-slate-700">Description</label>
						<Textarea
							name="description"
							defaultValue={task?.description}
							placeholder="Add any extra details, links, or notes..."
							className="bg-slate-50 resize-none h-20"
						/>
					</div>

					{/* Actions */}
					<div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
						<Button type="button" variant="ghost" onClick={onClose} className="text-slate-500">
							Cancel
						</Button>
						<Button
							type="submit"
							disabled={isPending}
							className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[120px]"
						>
							{isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
							{isPending ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Task'}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
