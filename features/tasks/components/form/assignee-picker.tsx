'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus } from 'lucide-react';
import { AssigneeOption } from '../../types/task-form.types';

interface AssigneePickerProps {
	availableAssignees: AssigneeOption[];
	selectedIds: string[];
	onChange: (ids: string[]) => void;
}

// DUMB COMPONENT: Displays the selected avatars and an add button
export function AssigneePicker({ availableAssignees, selectedIds, onChange }: AssigneePickerProps) {
	const selectedAssignees = availableAssignees.filter((a) => selectedIds.includes(a.id));

	// Toggle selection for demonstration
	const handleAddClick = () => {
		const unselected = availableAssignees.find((a) => !selectedIds.includes(a.id));
		if (unselected) {
			onChange([...selectedIds, unselected.id]);
		}
	};

	return (
		<div className="form-item space-y-1.5">
			<label className="text-xs font-semibold text-slate-700">Assignees</label>
			<div className="flex items-center gap-2">
				<div className="flex -space-x-2">
					{selectedAssignees.slice(0, 3).map((assignee) => (
						<Avatar key={assignee.id} className="h-8 w-8 border-2 border-white shadow-sm">
							{assignee.avatarUrl && <AvatarImage src={assignee.avatarUrl} />}
							<AvatarFallback className="bg-indigo-100 text-indigo-700 text-xs font-bold">
								{assignee.initials}
							</AvatarFallback>
						</Avatar>
					))}
					{selectedAssignees.length > 3 && (
						<div className="h-8 w-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-600 shadow-sm z-10">
							+{selectedAssignees.length - 3}
						</div>
					)}
				</div>

				<button
					type="button"
					onClick={handleAddClick}
					className="h-8 w-8 rounded-full border border-dashed border-slate-300 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 transition-all ml-1"
				>
					<Plus className="h-4 w-4" />
				</button>
			</div>
		</div>
	);
}
