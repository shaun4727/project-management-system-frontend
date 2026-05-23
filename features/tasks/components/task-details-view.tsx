'use client';

import gsap from 'gsap';
import { useLayoutEffect, useRef } from 'react';
import { TaskDetailsData } from '../types/task.types';
import { CommentsSection } from './comments-section';
import { LogTimeForm } from './log-time-form';
import { SubtaskList } from './subtask-list';
import { TaskHeader } from './task-header';
import { TimeLogHistory } from './time-log-history';

interface TaskDetailsViewProps {
	task: TaskDetailsData;
}

// CLIENT COMPONENT WRAPPER (Handles GSAP and Responsive Grid)
export function TaskDetailsView({ task }: TaskDetailsViewProps) {
	const containerRef = useRef<HTMLDivElement>(null);

	// GSAP Stagger animation for the panels
	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				'.stagger-panel',
				{ opacity: 0, y: 15 },
				{ opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
			);
		}, containerRef);
		return () => ctx.revert();
	}, []);

	return (
		<div
			ref={containerRef}
			className="bg-white rounded-3xl w-full mx-auto overflow-hidden border border-slate-200 shadow-xl flex flex-col md:max-h-[95vh]"
		>
			{/* 3-Column Responsive Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-12 h-full overflow-y-auto lg:overflow-hidden">
				{/* Column 1: Details & Subtasks */}
				<div className="lg:col-span-5 p-6 lg:p-8 lg:overflow-y-auto custom-scrollbar stagger-panel">
					<TaskHeader task={task} />

					<div className="mt-8 space-y-6">
						<div>
							<h3 className="text-sm font-bold text-slate-900 mb-2">Description</h3>
							<p className="text-sm text-slate-600 leading-relaxed">{task.description}</p>
						</div>

						<div>
							<h3 className="text-sm font-bold text-slate-900 mb-2">Subtasks</h3>
							<SubtaskList initialSubtasks={task.subtasks} />
						</div>
					</div>
				</div>

				{/* Column 2: Comments (Middle) */}
				<div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l lg:border-r border-slate-100 p-6 lg:p-8 lg:overflow-y-auto bg-white stagger-panel flex flex-col min-h-[400px]">
					<CommentsSection initialComments={task.comments} />
				</div>

				{/* Column 3: Time Logging (Right) */}
				<div className="lg:col-span-3 p-6 lg:overflow-y-auto custom-scrollbar stagger-panel bg-white">
					<LogTimeForm />
					<TimeLogHistory logs={task.timeLogs} />
				</div>
			</div>
		</div>
	);
}
