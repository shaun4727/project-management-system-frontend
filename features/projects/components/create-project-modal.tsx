'use client';

import { createProjectAction } from '@/actions/project/project.action';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Plus } from 'lucide-react';
import { useActionState, useEffect, useState } from 'react';

export function CreateProjectModal() {
	const [isOpen, setIsOpen] = useState(false);

	// React 19's native form state hook
	const [state, formAction, isPending] = useActionState(createProjectAction, null);

	// Auto-close modal when creation is successful
	useEffect(() => {
		if (state?.success) {
			setIsOpen(false);
		}
	}, [state]);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm gap-2">
					<Plus className="h-4 w-4" /> New Project
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[500px] bg-white border-slate-100 shadow-xl rounded-2xl">
				<DialogHeader>
					<DialogTitle className="text-xl font-bold text-slate-900">Create New Project</DialogTitle>
					<DialogDescription className="text-sm text-slate-500">
						Fill in the details below to initialize a new project workspace.
					</DialogDescription>
				</DialogHeader>

				{/* Display Error Message if the server action fails */}
				{state?.error && (
					<div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg">
						{state.error}
					</div>
				)}

				<form action={formAction} className="space-y-4 mt-2">
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-1.5 col-span-2 sm:col-span-1">
							<label className="text-sm font-semibold text-slate-700">Project Title *</label>
							<Input
								name="title"
								required
								placeholder="e.g. MPMS Dashboard"
								className="bg-slate-50 border-slate-200"
							/>
						</div>
						<div className="space-y-1.5 col-span-2 sm:col-span-1">
							<label className="text-sm font-semibold text-slate-700">Client Name *</label>
							<Input
								name="client"
								required
								placeholder="e.g. Acme Corp"
								className="bg-slate-50 border-slate-200"
							/>
						</div>
					</div>

					<div className="space-y-1.5">
						<label className="text-sm font-semibold text-slate-700">Description</label>
						<Textarea
							name="description"
							placeholder="Brief project overview..."
							className="bg-slate-50 border-slate-200 resize-none h-20"
						/>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-1.5">
							<label className="text-sm font-semibold text-slate-700">Start Date *</label>
							<Input name="startDate" type="date" required className="bg-slate-50 border-slate-200" />
						</div>
						<div className="space-y-1.5">
							<label className="text-sm font-semibold text-slate-700">End Date *</label>
							<Input name="endDate" type="date" required className="bg-slate-50 border-slate-200" />
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-1.5">
							<label className="text-sm font-semibold text-slate-700">Budget ($)</label>
							<Input
								name="budget"
								type="number"
								min="0"
								step="0.01"
								placeholder="5000"
								className="bg-slate-50 border-slate-200"
							/>
						</div>
						<div className="space-y-1.5">
							<label className="text-sm font-semibold text-slate-700">Status</label>
							<select
								name="status"
								className="flex h-10 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
							>
								<option value="PLANNED">Planned</option>
								<option value="ACTIVE">Active</option>
							</select>
						</div>
					</div>

					<div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
						<Button
							type="button"
							variant="ghost"
							onClick={() => setIsOpen(false)}
							className="text-slate-500"
						>
							Cancel
						</Button>
						<Button
							type="submit"
							disabled={isPending}
							className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[120px]"
						>
							{isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
							{isPending ? 'Creating...' : 'Create Project'}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
