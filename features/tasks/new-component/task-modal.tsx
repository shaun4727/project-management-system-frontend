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

	// 1. Controlled Form State
	const [formData, setFormData] = useState({
		title: '',
		projectId: '',
		sprintId: '',
		assigneeId: '',
		estimateHours: '',
		status: 'TODO',
		priority: 'MEDIUM',
		dueDate: '',
		description: '',
	});

	// Handle Closing
	useEffect(() => {
		if (state?.success) onClose();
	}, [state, onClose]);

	// 2. Safely initialize data when modal opens
	useEffect(() => {
		if (isOpen) {
			const derivedProjectId = task?.projectId || task?.project?.id || task?.sprint?.projectId || '';

			setFormData({
				title: task?.title || '',
				projectId: derivedProjectId,
				sprintId: task?.sprintId || '',
				assigneeId: task?.assignees?.[0]?.id || task?.assigneeId || '',
				estimateHours: task?.estimateHours ? String(task.estimateHours) : '',
				status: task?.status || 'TODO',
				priority: task?.priority || 'MEDIUM',
				dueDate: task?.dueDate ? task.dueDate.split('T')[0] : '',
				description: task?.description || '',
			});
		}
	}, [isOpen, task]);

	// 3. Handle all input changes centrally
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		// If Project changes, automatically clear the Sprint
		if (name === 'projectId') {
			setFormData((prev) => ({ ...prev, sprintId: '' }));
		}
	};

	// Derived values for the Edit Mode read-only fields
	const currentProjectName = projects.find((p) => p.id === formData.projectId)?.title || 'No Project';
	const currentSprintName = sprints.find((s) => s.id === formData.sprintId)?.title || 'Backlog (No Sprint)';
	const filteredSprints = sprints.filter((sprint) => sprint.projectId === formData.projectId);

	// 4. Validation: Check explicitly required fields (Sprint is optional)
	const requiredFields = [
		'title',
		'projectId',
		'assigneeId',
		'estimateHours',
		'status',
		'priority',
		'dueDate',
		'description',
	];
	const isFormValid = requiredFields.every((key) => {
		const val = (formData as any)[key];
		return typeof val === 'string' ? val.trim() !== '' : val !== null && val !== undefined;
	});

	return (
		<Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
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
							value={formData.title}
							onChange={handleInputChange}
							required
							className="bg-slate-50"
							placeholder="e.g. Setup Database Schema"
						/>
					</div>

					{/* Row 2: Project & Sprint (CONDITIONAL RENDER) */}
					{isEditing ? (
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-1.5">
								<label className="text-sm font-semibold text-slate-700">Project</label>
								{/* Disabled Input for display */}
								<Input
									disabled
									value={currentProjectName}
									className="bg-slate-100 text-slate-500 cursor-not-allowed"
								/>
								{/* Hidden Input so formData still sends the ID to the server */}
								<input type="hidden" name="projectId" value={formData.projectId} />
							</div>
							<div className="space-y-1.5">
								<label className="text-sm font-semibold text-slate-700">Sprint</label>
								<Input
									disabled
									value={currentSprintName}
									className="bg-slate-100 text-slate-500 cursor-not-allowed"
								/>
								<input type="hidden" name="sprintId" value={formData.sprintId} />
							</div>
						</div>
					) : (
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-1.5">
								<label className="text-sm font-semibold text-slate-700">Project *</label>
								<select
									name="projectId"
									value={formData.projectId}
									onChange={handleInputChange}
									className="flex h-10 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500/20"
								>
									<option value="">Select Project</option>
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
									value={formData.sprintId}
									onChange={handleInputChange}
									disabled={!formData.projectId}
									className="flex h-10 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm disabled:opacity-50"
								>
									<option value="">
										{formData.projectId ? 'Backlog (No Sprint)' : 'Select a Project first'}
									</option>
									{filteredSprints.map((s) => (
										<option key={s.id} value={s.id}>
											Sprint {s.sprintNumber}: {s.title}
										</option>
									))}
								</select>
							</div>
						</div>
					)}

					{/* Row 3: Assignee, Estimate Hours, Status */}
					<div className="grid grid-cols-3 gap-4">
						<div className="space-y-1.5">
							<label className="text-sm font-semibold text-slate-700">Assignee *</label>
							<select
								name="assigneeId"
								value={formData.assigneeId}
								onChange={handleInputChange}
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
							<label className="text-sm font-semibold text-slate-700">Est. Hours *</label>
							<Input
								name="estimateHours"
								type="number"
								step="0.5"
								min="0"
								placeholder="e.g. 4.5"
								value={formData.estimateHours}
								onChange={handleInputChange}
								className="bg-slate-50"
							/>
						</div>
						<div className="space-y-1.5">
							<label className="text-sm font-semibold text-slate-700">Status *</label>
							<select
								name="status"
								value={formData.status}
								onChange={handleInputChange}
								className="flex h-10 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
							>
								<option value="TODO">To Do</option>
								<option value="IN_PROGRESS">In Progress</option>
								<option value="REVIEW_REQUIRED">Review Required</option>
								<option value="DONE">Done</option>
							</select>
						</div>
					</div>

					{/* Row 4: Priority, Due Date */}
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-1.5">
							<label className="text-sm font-semibold text-slate-700">Priority *</label>
							<select
								name="priority"
								value={formData.priority}
								onChange={handleInputChange}
								className="flex h-10 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
							>
								<option value="LOW">Low</option>
								<option value="MEDIUM">Medium</option>
								<option value="HIGH">High</option>
							</select>
						</div>

						<div className="space-y-1.5">
							<label className="text-sm font-semibold text-slate-700">Due Date *</label>
							<Input
								name="dueDate"
								type="date"
								value={formData.dueDate}
								onChange={handleInputChange}
								className="bg-slate-50"
							/>
						</div>
					</div>

					{/* Row 5: Description */}
					<div className="space-y-1.5">
						<label className="text-sm font-semibold text-slate-700">Description *</label>
						<Textarea
							name="description"
							value={formData.description}
							onChange={handleInputChange}
							placeholder="Add any extra details, links, or notes..."
							className="bg-slate-50 resize-none h-20"
						/>
					</div>

					{/* Actions */}
					<div className="flex items-center justify-between pt-4 border-t border-slate-100">
						<p className="text-xs text-slate-500">
							{!isFormValid && '* Please fill out all required fields to continue.'}
						</p>
						<div className="flex items-center gap-3">
							<Button type="button" variant="ghost" onClick={onClose} className="text-slate-500">
								Cancel
							</Button>
							<Button
								type="submit"
								disabled={isPending || !isFormValid}
								className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[120px] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
							>
								{isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
								{isPending ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Task'}
							</Button>
						</div>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
