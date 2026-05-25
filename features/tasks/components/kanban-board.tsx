'use client';

import { patchTaskAction } from '@/actions/task.actions';
import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import { MoreHorizontal, Plus } from 'lucide-react';
import { useState, useTransition } from 'react';
import { TaskCard } from './task-card';

const COLUMNS = [
	{ id: 'todo', title: 'Todo', statusMap: 'TODO', bg: 'bg-[#F8FAFC]', headerText: 'text-slate-700' },
	{
		id: 'inprogress',
		title: 'In Progress',
		statusMap: 'IN_PROGRESS',
		bg: 'bg-[#EEF2FF]',
		headerText: 'text-indigo-700',
	},
	{
		id: 'review',
		title: 'Review Required',
		statusMap: 'REVIEW_REQUIRED',
		bg: 'bg-[#FFFBEB]',
		headerText: 'text-amber-700',
	},
	{ id: 'done', title: 'Done', statusMap: 'DONE', bg: 'bg-[#ECFDF5]', headerText: 'text-emerald-700' },
];

interface KanbanBoardProps {
	initialTasks: any[];
}

export function KanbanBoard({ initialTasks }: KanbanBoardProps) {
	const [tasks, setTasks] = useState(initialTasks);
	const [isPending, startTransition] = useTransition();

	const onDragEnd = (result: DropResult) => {
		const { destination, source, draggableId } = result;
		if (!destination) return;
		if (destination.droppableId === source.droppableId && destination.index === source.index) return;

		// 1. Optimistic UI Update (Instantly moves the card)
		const updatedTasks = tasks.map((task) => {
			if (task.id === draggableId) {
				return { ...task, col: destination.droppableId };
			}
			return task;
		});
		setTasks(updatedTasks);

		// 2. Find the correct backend STATUS string based on the column dropped into
		const targetColumn = COLUMNS.find((c) => c.id === destination.droppableId);
		const newStatus = targetColumn?.statusMap;

		// 3. Trigger Server Action to save to DB in the background
		if (newStatus) {
			startTransition(() => {
				patchTaskAction(draggableId, { status: newStatus });
			});
		}
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className="flex h-[calc(100vh-220px)] gap-6 overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory">
				{COLUMNS.map((col) => {
					// Dynamically calculate the count so numbers update instantly on drag
					const columnTasks = tasks.filter((t) => t.col === col.id);

					return (
						<Droppable key={col.id} droppableId={col.id}>
							{(provided, snapshot) => (
								<div
									{...provided.droppableProps}
									ref={provided.innerRef}
									className={`flex flex-col min-w-[320px] max-w-[320px] rounded-2xl p-4 shrink-0 snap-center transition-colors duration-200 ${col.bg} ${snapshot.isDraggingOver ? 'ring-2 ring-indigo-500/20' : ''}`}
								>
									{/* Column Header */}
									<div className="flex items-center justify-between mb-4 px-1">
										<div className="flex items-center gap-2">
											<h3 className={`text-sm font-bold ${col.headerText}`}>{col.title}</h3>
											<span className="text-xs font-semibold text-slate-400">
												{columnTasks.length}
											</span>
										</div>
										<div className="flex items-center gap-1">
											<button className="p-1 text-slate-400 hover:text-slate-600 rounded-md hover:bg-black/5">
												<MoreHorizontal className="h-4 w-4" />
											</button>
											<button className="p-1 text-slate-400 hover:text-slate-600 rounded-md hover:bg-black/5">
												<Plus className="h-4 w-4" />
											</button>
										</div>
									</div>

									{/* Cards Container */}
									<div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
										{columnTasks.map((task, index) => (
											<Draggable key={task.id} draggableId={task.id} index={index}>
												{(provided: any, snap: any) => (
													<div
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
														style={{ ...provided.draggableProps.style }}
														className={`${snap.isDragging ? 'rotate-2 scale-105 shadow-2xl z-50 transition-transform' : ''}`}
													>
														<TaskCard task={task} />
													</div>
												)}
											</Draggable>
										))}
										{provided.placeholder}

										{/* The Add Task button specific to the Todo column in the design */}
										{col.id === 'todo' && (
											<button className="w-full py-3 mt-2 flex items-center justify-center gap-2 text-sm font-medium text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all border border-transparent border-dashed hover:border-indigo-200">
												<Plus className="h-4 w-4" /> Add Task
											</button>
										)}
									</div>
								</div>
							)}
						</Droppable>
					);
				})}
			</div>
		</DragDropContext>
	);
}
