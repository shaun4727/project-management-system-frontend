'use client';

import { deleteTaskAction, patchTaskAction } from '@/actions/task.actions';
import { RoleGuard } from '@/components/shared/role-guard';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/providers/auth-provider';
import { gsap } from 'gsap';
import { Check, Eye, Pencil, Plus, Trash2, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { startTransition, useEffect, useRef, useState } from 'react';
import { TaskModal } from './task-modal';

export function TaskDashboard({ tasks = [], projects = [], sprints = [], users = [] }: any) {
	const containerRef = useRef<HTMLDivElement>(null);
	const router = useRouter();
	const searchParams = useSearchParams();
	const { user } = useAuth();

	// Modal State
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingTask, setEditingTask] = useState<any>(null);
	const [modalKey, setModalKey] = useState(0);

	// In-Place Edit State
	const [inlineEditId, setInlineEditId] = useState<string | null>(null);
	const [inlineTitle, setInlineTitle] = useState('');

	// Delete Confirmation State
	const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

	// Dynamically build filter options from props
	const filterOptions: Record<string, { id: string; label: string }[]> = {
		project: projects.map((p: any) => ({ id: p.id, label: p.title })),
		sprint: sprints.map((s: any) => ({ id: s.id, label: `Sprint ${s.sprintNumber}: ${s.title}` })),
		assignee: users.map((u: any) => ({ id: u.id, label: u.name })),
		status: [
			{ id: 'TODO', label: 'To Do' },
			{ id: 'IN_PROGRESS', label: 'In Progress' },
			{ id: 'REVIEW_REQUIRED', label: 'Review Required' },
			{ id: 'DONE', label: 'Done' },
		],
		priority: [
			{ id: 'LOW', label: 'Low' },
			{ id: 'MEDIUM', label: 'Medium' },
			{ id: 'HIGH', label: 'High' },
		],
	};

	const getInitials = (name: string) => {
		if (!name) return '?';
		return name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.substring(0, 2)
			.toUpperCase();
	};

	// GSAP Stagger Animation
	useEffect(() => {
		const ctx = gsap.context(() => {
			if (tasks.length > 0) {
				gsap.from('.table-row-item', { y: 15, opacity: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' });
			}
		}, containerRef);
		return () => ctx.revert();
	}, [tasks]);

	// Handlers
	const handleFilterChange = (key: string, value: string) => {
		const params = new URLSearchParams(searchParams.toString());
		if (value === 'all') params.delete(key);
		else params.set(key, value);
		params.set('page', '1');
		router.push(`/tasks?${params.toString()}`);
	};

	const handleOpenModal = (task: any = null) => {
		setEditingTask(task);
		setModalKey((prev) => prev + 1);
		setIsModalOpen(true);
	};

	const confirmDelete = () => {
		if (taskToDelete) {
			startTransition(() => {
				deleteTaskAction(taskToDelete);
				setTaskToDelete(null);
			});
		}
	};

	const handleInlineSave = (id: string) => {
		if (inlineTitle.trim()) {
			startTransition(() => {
				patchTaskAction(id, { title: inlineTitle });
				setInlineEditId(null);
			});
		}
	};

	const handleStatusQuickChange = (id: string, newStatus: string) => {
		startTransition(() => {
			patchTaskAction(id, { status: newStatus });
		});
	};

	return (
		<div ref={containerRef} className="p-4 sm:p-6 lg:p-8 w-full max-w-[1400px] mx-auto min-h-screen space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold text-slate-900">Tasks</h1>
					<p className="text-sm text-slate-500">Plan, track, and manage all tasks in one place.</p>
				</div>
				<RoleGuard allowedRoles={['ADMIN', 'MANAGER']}>
					<Button
						onClick={() => handleOpenModal()}
						className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
					>
						<Plus className="h-4 w-4 mr-2" /> New Task
					</Button>
				</RoleGuard>
			</div>

			{/* Filters Row */}
			<div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
				{['project', 'sprint', 'assignee', 'status', 'priority'].map((filterKey) => (
					<div key={filterKey} className="w-40">
						<label className="text-xs font-semibold text-slate-500 capitalize mb-1 block">
							{filterKey}
						</label>
						<Select
							value={searchParams.get(filterKey) || 'all'}
							onValueChange={(val) => handleFilterChange(filterKey, val)}
						>
							<SelectTrigger className="h-9 bg-slate-50 border-slate-200">
								<SelectValue placeholder={`All ${filterKey}s`} />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All</SelectItem>
								{filterOptions[filterKey]?.map((opt: { id: string; label: string }) => (
									<SelectItem key={opt.id} value={opt.id}>
										{opt.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				))}
			</div>

			{/* Task Table */}
			<div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full text-left text-sm text-slate-600 min-w-[1100px]">
						<thead className="text-xs text-slate-400 font-medium border-b border-slate-100 bg-slate-50/50">
							<tr>
								<th className="py-4 px-4 font-medium w-[25%]">Task</th>
								<th className="py-4 px-4 font-medium">Assignee</th>
								<th className="py-4 px-4 font-medium">Project / Sprint</th>
								<th className="py-4 px-4 font-medium">Status</th>
								<th className="py-4 px-4 font-medium">Priority</th>
								<th className="py-4 px-4 font-medium">Due Date</th>
								<th className="py-4 px-4 font-medium text-right">Actions</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-50">
							{tasks.length === 0 ? (
								<tr>
									<td colSpan={7} className="py-12 text-center text-slate-500 font-medium">
										No tasks found. Try adjusting your filters or create a new task.
									</td>
								</tr>
							) : (
								tasks.map((task: any) => {
									// Safely extract assignee
									const assignee = task.assignees?.[0] || task.assignee || null;

									return (
										<tr
											key={task.id}
											className="table-row-item group hover:bg-slate-50 transition-colors"
										>
											{/* In-Place Editable Title */}
											<td className="py-3 px-4">
												{inlineEditId === task.id ? (
													<div className="flex items-center gap-2">
														<Input
															autoFocus
															value={inlineTitle}
															onChange={(e) => setInlineTitle(e.target.value)}
															onKeyDown={(e) =>
																e.key === 'Enter' && handleInlineSave(task.id)
															}
															className="h-8 border-indigo-300 focus-visible:ring-indigo-500"
														/>
														<button
															onClick={() => handleInlineSave(task.id)}
															className="p-1.5 bg-emerald-100 text-emerald-700 rounded-md hover:bg-emerald-200 transition-colors"
														>
															<Check className="h-4 w-4" />
														</button>
														<button
															onClick={() => setInlineEditId(null)}
															className="p-1.5 bg-slate-100 text-slate-600 rounded-md hover:bg-slate-200 transition-colors"
														>
															<X className="h-4 w-4" />
														</button>
													</div>
												) : (
													<div
														onClick={() => {
															setInlineEditId(task.id);
															setInlineTitle(task.title);
														}}
														className="font-medium text-slate-900 cursor-text hover:bg-slate-100 p-1 -ml-1 rounded transition-colors inline-block"
														title="Click to edit"
													>
														{task.title}
														<span className="block text-xs text-slate-400 font-normal mt-0.5 uppercase tracking-wider">
															{task.id.split('-')[0]}-
															{task.id.substring(task.id.length - 4)}
														</span>
													</div>
												)}
											</td>

											{/* Assignee UI */}
											<td className="py-3 px-4">
												{assignee ? (
													<div className="flex items-center gap-2" title={assignee.name}>
														<div className="h-7 w-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold border border-white shadow-sm">
															{getInitials(assignee.name)}
														</div>
														<span className="text-sm font-medium text-slate-700 hidden lg:block truncate max-w-[100px]">
															{assignee.name.split(' ')[0]}
														</span>
													</div>
												) : (
													<span className="text-xs text-slate-400 italic">Unassigned</span>
												)}
											</td>

											<td className="py-3 px-4">
												<div className="flex flex-col gap-1">
													<div className="flex items-center gap-2">
														<div className="h-4 w-4 rounded bg-indigo-100 flex items-center justify-center text-[8px] font-bold text-indigo-700">
															P
														</div>
														<span className="font-medium truncate max-w-[150px]">
															{task.project?.title || 'No Project'}
														</span>
													</div>
													<span className="text-xs text-slate-400 ml-6 truncate max-w-[150px]">
														{task.sprint?.title || 'Backlog'}
													</span>
												</div>
											</td>

											{/* Quick Status Dropdown */}
											<td className="py-3 px-4">
												<Select
													value={task.status}
													onValueChange={(val) => handleStatusQuickChange(task.id, val)}
													// 3. Disable the entire dropdown if it's already DONE and they aren't an ADMIN
													disabled={task.status === 'DONE' && user?.role !== 'ADMIN'}
												>
													<SelectTrigger
														className={`h-8 text-xs font-semibold shadow-none border-0 w-[130px] transition-colors ${
															task.status === 'DONE'
																? 'bg-emerald-50 text-emerald-700'
																: task.status === 'IN_PROGRESS'
																	? 'bg-indigo-50 text-indigo-700'
																	: task.status === 'REVIEW_REQUIRED'
																		? 'bg-amber-50 text-amber-700'
																		: 'bg-slate-100 text-slate-700'
														}`}
													>
														<SelectValue />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="TODO">To Do</SelectItem>
														<SelectItem value="IN_PROGRESS">In Progress</SelectItem>
														<SelectItem value="REVIEW_REQUIRED">Review</SelectItem>

														{/* 4. Logic for the DONE option */}
														{(user?.role === 'ADMIN' || task.status === 'DONE') && (
															<SelectItem
																value="DONE"
																// Only disable the specific option if they aren't an admin
																disabled={user?.role !== 'ADMIN'}
															>
																Done
															</SelectItem>
														)}
													</SelectContent>
												</Select>
											</td>

											<td className="py-3 px-4">
												<Badge
													className={`shadow-none font-semibold ${
														task.priority === 'HIGH'
															? 'bg-red-50 text-red-600 hover:bg-red-100'
															: task.priority === 'MEDIUM'
																? 'bg-orange-50 text-orange-600 hover:bg-orange-100'
																: 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
													}`}
												>
													{task.priority}
												</Badge>
											</td>

											<td className="py-3 px-4 text-xs font-medium text-slate-500">
												{task.dueDate
													? new Date(task.dueDate).toLocaleDateString('en-US', {
															month: 'short',
															day: 'numeric',
															year: 'numeric',
														})
													: 'No Date'}
											</td>

											{/* Actions with Faded Icons */}
											<td className="py-3 px-4 text-right">
												<div className="flex items-center justify-end gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
													<Link href={`/tasks/${task.id}`}>
														<button
															className="p-2 hover:bg-slate-100 text-slate-600 hover:text-slate-900 rounded-lg transition-colors cursor-pointer"
															title="View Full Details"
														>
															<Eye className="h-4 w-4" />
														</button>
													</Link>
													<button
														onClick={() => handleOpenModal(task)}
														className="p-2 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors cursor-pointer"
														title="Edit Full Task"
													>
														<Pencil className="h-4 w-4" />
													</button>
													<button
														onClick={() => setTaskToDelete(task.id)}
														className="p-2 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
														title="Delete Task"
													>
														<Trash2 className="h-4 w-4" />
													</button>
												</div>
											</td>
										</tr>
									);
								})
							)}
						</tbody>
					</table>
				</div>
			</div>

			<TaskModal
				key={modalKey}
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				task={editingTask}
				projects={projects}
				sprints={sprints}
				users={users}
			/>

			<AlertDialog open={!!taskToDelete} onOpenChange={(open) => !open && setTaskToDelete(null)}>
				<AlertDialogContent className="bg-white border-slate-200 shadow-xl rounded-xl sm:max-w-[425px]">
					<AlertDialogHeader>
						<AlertDialogTitle className="text-xl font-bold text-slate-900">Delete Task</AlertDialogTitle>
						<AlertDialogDescription className="text-sm text-slate-500 mt-2">
							Are you absolutely sure? This action cannot be undone. This will permanently delete this
							task from the project.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter className="mt-6">
						<AlertDialogCancel
							onClick={() => setTaskToDelete(null)}
							className="border-slate-200 text-slate-600 hover:bg-slate-50"
						>
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							onClick={confirmDelete}
							className="bg-red-600 hover:bg-red-700 text-white shadow-sm"
						>
							Yes, delete task
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
