'use client';

import { Badge } from '@/components/ui/badge';
import { CheckCircle2, ChevronDown, ChevronRight, Circle, Pencil } from 'lucide-react';
import React, { useState } from 'react';
import { SprintModal } from './sprints-modal';

interface Task {
	id: string;
	title: string;
	status: string;
}

interface Sprint {
	id: string;
	title: string;
	sprintNumber: number;
	startDate: string;
	endDate: string;
	projectId: string;
	tasks?: Task[];
}

interface SprintTableViewProps {
	sprints: Sprint[];
	projectId: string;
}

export function SprintTableView({ sprints, projectId }: SprintTableViewProps) {
	const [expandedSprintId, setExpandedSprintId] = useState<string | null>(null);
	const [editingSprint, setEditingSprint] = useState<Sprint | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalKey, setModalKey] = useState(0);

	const toggleExpand = (sprintId: string) => {
		setExpandedSprintId((prev) => (prev === sprintId ? null : sprintId));
	};

	const handleEditClick = (e: React.MouseEvent, sprint: Sprint) => {
		e.stopPropagation(); // Prevent row expansion when clicking edit
		setEditingSprint(sprint);
		setModalKey((prev) => prev + 1);
		setIsModalOpen(true);
	};

	const formatDate = (dateString: string) => {
		return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(
			new Date(dateString),
		);
	};

	if (!sprints || sprints.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center p-12 bg-white border border-slate-200 rounded-xl shadow-sm border-dashed">
				<p className="text-slate-500 font-medium text-sm">No sprints have been created yet.</p>
			</div>
		);
	}

	// Sort by sprint number
	const sortedSprints = [...sprints].sort((a, b) => a.sprintNumber - b.sprintNumber);

	return (
		<div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
			<table className="w-full text-left text-sm text-slate-600">
				<thead className="text-xs text-slate-400 font-medium border-b border-slate-100 bg-slate-50/50">
					<tr>
						<th className="py-4 px-4 w-10"></th>
						<th className="py-4 px-4 font-medium">Sprint Name</th>
						<th className="py-4 px-4 font-medium">Timeline</th>
						<th className="py-4 px-4 font-medium">Tasks</th>
						<th className="py-4 px-4 font-medium text-right">Actions</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-slate-50">
					{sortedSprints.map((sprint) => {
						const isExpanded = expandedSprintId === sprint.id;
						const tasks = sprint.tasks || [];
						const completedTasks = tasks.filter((t) => t.status === 'DONE').length;

						return (
							<React.Fragment key={sprint.id}>
								{/* Main Sprint Row */}
								<tr
									onClick={() => toggleExpand(sprint.id)}
									className="group hover:bg-slate-50 transition-colors cursor-pointer"
								>
									<td className="py-4 px-4 text-slate-400">
										{isExpanded ? (
											<ChevronDown className="h-4 w-4" />
										) : (
											<ChevronRight className="h-4 w-4" />
										)}
									</td>
									<td className="py-4 px-4">
										<p className="font-semibold text-slate-900">
											Sprint {sprint.sprintNumber}: {sprint.title}
										</p>
									</td>
									<td className="py-4 px-4 text-xs font-medium">
										{formatDate(sprint.startDate)} — {formatDate(sprint.endDate)}
									</td>
									<td className="py-4 px-4">
										<Badge className="bg-slate-100 text-slate-600 shadow-none hover:bg-slate-200">
											{completedTasks} / {tasks.length} Done
										</Badge>
									</td>
									<td className="py-4 px-4 text-right">
										<button
											onClick={(e) => handleEditClick(e, sprint)}
											className="p-2 -mr-2 opacity-50 hover:opacity-100 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all cursor-pointer"
											title="Edit Sprint"
										>
											<Pencil className="h-4 w-4" />
										</button>
									</td>
								</tr>

								{/* Expanded Tasks List */}
								{isExpanded && (
									<tr className="bg-slate-50/50">
										<td colSpan={5} className="py-0 px-0">
											<div className="px-12 py-4 border-l-2 border-indigo-500 ml-4 my-2">
												<h4 className="text-xs font-bold text-slate-900 mb-3 uppercase tracking-wider">
													Tasks in this Sprint
												</h4>
												{tasks.length === 0 ? (
													<p className="text-xs text-slate-500 italic">
														No tasks assigned yet.
													</p>
												) : (
													<ul className="space-y-2">
														{tasks.map((task) => (
															<li
																key={task.id}
																className="flex items-center gap-2 text-sm text-slate-600"
															>
																{task.status === 'DONE' ? (
																	<CheckCircle2 className="h-4 w-4 text-emerald-500" />
																) : (
																	<Circle className="h-4 w-4 text-slate-300" />
																)}
																<span
																	className={
																		task.status === 'DONE'
																			? 'line-through text-slate-400'
																			: ''
																	}
																>
																	{task.title}
																</span>
															</li>
														))}
													</ul>
												)}
											</div>
										</td>
									</tr>
								)}
							</React.Fragment>
						);
					})}
				</tbody>
			</table>

			{/* Mount the Unified Sprint Modal */}
			<SprintModal
				key={modalKey}
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				projectId={projectId}
				sprint={editingSprint}
			/>
		</div>
	);
}
