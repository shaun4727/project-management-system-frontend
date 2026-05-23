'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { Subtask } from '../types/task.types';

interface SubtaskListProps {
	initialSubtasks: Subtask[];
}

// CLIENT COMPONENT (Manages Checkbox State)
export function SubtaskList({ initialSubtasks }: SubtaskListProps) {
	const [subtasks, setSubtasks] = useState<Subtask[]>(initialSubtasks);

	const toggleSubtask = (id: string) => {
		setSubtasks(subtasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
	};

	return (
		<div className="space-y-3 mt-4">
			{subtasks.map((subtask) => (
				<div key={subtask.id} className="flex items-center justify-between group">
					<div className="flex items-center space-x-3">
						<Checkbox
							id={subtask.id}
							checked={subtask.completed}
							onCheckedChange={() => toggleSubtask(subtask.id)}
							className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
						/>
						<label
							htmlFor={subtask.id}
							className={`text-sm font-medium cursor-pointer ${subtask.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}
						>
							{subtask.title}
						</label>
					</div>
					{/* Decorative Progress bar placeholder for subtasks */}
					<div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden hidden sm:block">
						<div
							className={`h-full rounded-full transition-all ${subtask.completed ? 'w-full bg-indigo-500' : 'w-1/2 bg-indigo-200'}`}
						/>
					</div>
				</div>
			))}
		</div>
	);
}
