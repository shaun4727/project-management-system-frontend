'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, ArrowDown, Target } from 'lucide-react';

interface PrioritySelectProps {
	value: string;
	onChange: (value: 'High' | 'Medium' | 'Low') => void;
}

// DUMB COMPONENT: Only handles UI and passes value changes up
export function PrioritySelect({ value, onChange }: PrioritySelectProps) {
	return (
		<div className="form-item space-y-1.5">
			<label className="text-xs font-semibold text-slate-700">Priority</label>
			<Select value={value} onValueChange={onChange}>
				<SelectTrigger className="w-full bg-white border-slate-200 focus:ring-indigo-500/20 shadow-sm h-10">
					<SelectValue placeholder="Select priority" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="High">
						<div className="flex items-center gap-2 text-red-600 font-medium">
							<Target className="h-4 w-4" /> High
						</div>
					</SelectItem>
					<SelectItem value="Medium">
						<div className="flex items-center gap-2 text-amber-600 font-medium">
							<AlertCircle className="h-4 w-4" /> Medium
						</div>
					</SelectItem>
					<SelectItem value="Low">
						<div className="flex items-center gap-2 text-emerald-600 font-medium">
							<ArrowDown className="h-4 w-4" /> Low
						</div>
					</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
}
