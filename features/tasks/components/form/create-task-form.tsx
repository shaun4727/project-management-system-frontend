'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import gsap from 'gsap';
import { useLayoutEffect, useRef, useState } from 'react';
import { AssigneeOption, CreateTaskFormData, SprintOption } from '../../types/task-form.types';
import { AssigneePicker } from './assignee-picker';
import { PrioritySelect } from './priority-select';

interface CreateTaskFormProps {
	sprints: SprintOption[];
	availableAssignees: AssigneeOption[];
	onCancel: () => void;
	onSubmitSuccess: () => void;
}

// SMART COMPONENT: Handles form state, validation, submission, and GSAP entry
export function CreateTaskForm({ sprints, availableAssignees, onCancel, onSubmitSuccess }: CreateTaskFormProps) {
	const formRef = useRef<HTMLFormElement>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const [formData, setFormData] = useState<CreateTaskFormData>({
		title: '',
		sprintId: '',
		description: '',
		priority: 'High',
		estimateHours: '',
		assigneeIds: availableAssignees.slice(0, 2).map((a) => a.id), // Pre-select a couple for UI accuracy
	});

	// GSAP Form Stagger Entry
	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				'.form-item',
				{ opacity: 0, y: 10 },
				{ opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out', delay: 0.1 },
			);
		}, formRef);
		return () => ctx.revert();
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!formData.title || !formData.sprintId) return;

		setIsSubmitting(true);
		// In production: await dispatch(createTask(formData))
		setTimeout(() => {
			setIsSubmitting(false);
			onSubmitSuccess();
		}, 1000);
	};

	return (
		<form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
			<div className="form-item space-y-1.5">
				<label className="text-xs font-semibold text-slate-700">
					Title <span className="text-red-500">*</span>
				</label>
				<Input
					value={formData.title}
					onChange={(e) => setFormData({ ...formData, title: e.target.value })}
					placeholder="e.g. Setup Authentication"
					className="bg-white border-slate-200 focus-visible:ring-indigo-500/20 shadow-sm h-10"
					required
				/>
			</div>

			<div className="form-item space-y-1.5">
				<label className="text-xs font-semibold text-slate-700">
					Sprint <span className="text-red-500">*</span>
				</label>
				<Select value={formData.sprintId} onValueChange={(val) => setFormData({ ...formData, sprintId: val })}>
					<SelectTrigger className="w-full bg-white border-slate-200 focus:ring-indigo-500/20 shadow-sm h-10">
						<SelectValue placeholder="Select a sprint" />
					</SelectTrigger>
					<SelectContent>
						{sprints.map((sprint) => (
							<SelectItem key={sprint.id} value={sprint.id}>
								{sprint.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div className="form-item space-y-1.5">
				<label className="text-xs font-semibold text-slate-700">Description</label>
				<Textarea
					value={formData.description}
					onChange={(e) => setFormData({ ...formData, description: e.target.value })}
					placeholder="Implement JWT and role-based access..."
					className="bg-white border-slate-200 focus-visible:ring-indigo-500/20 shadow-sm resize-none min-h-[80px]"
				/>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
				<PrioritySelect
					value={formData.priority}
					onChange={(val: any) => setFormData({ ...formData, priority: val })}
				/>

				<div className="form-item space-y-1.5">
					<label className="text-xs font-semibold text-slate-700">Estimate (hours)</label>
					<Input
						type="number"
						min="0"
						step="0.5"
						value={formData.estimateHours}
						onChange={(e) =>
							setFormData({ ...formData, estimateHours: e.target.value ? Number(e.target.value) : '' })
						}
						placeholder="e.g. 5"
						className="bg-white border-slate-200 focus-visible:ring-indigo-500/20 shadow-sm h-10"
					/>
				</div>
			</div>

			<AssigneePicker
				availableAssignees={availableAssignees}
				selectedIds={formData.assigneeIds}
				onChange={(ids: any) => setFormData({ ...formData, assigneeIds: ids })}
			/>

			<div className="form-item pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
				<Button
					type="button"
					variant="outline"
					onClick={onCancel}
					disabled={isSubmitting}
					className="border-slate-200 text-slate-600 hover:bg-slate-50"
				>
					Cancel
				</Button>
				<Button
					type="submit"
					disabled={isSubmitting || !formData.title || !formData.sprintId}
					className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 shadow-sm"
				>
					{isSubmitting ? 'Creating...' : 'Create Task'}
				</Button>
			</div>
		</form>
	);
}
