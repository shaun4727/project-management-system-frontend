'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { LogTimeFormData } from '../../types/time-log.type';

interface LogTimeFormProps {
	taskId: string;
}

// SMART CLIENT COMPONENT: Handles user input, state, and API submission
export function LogTimeForm({ taskId }: LogTimeFormProps) {
	const [formData, setFormData] = useState<LogTimeFormData>({
		hours: 2.5,
		description: 'Fixed the authentication bug.',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!formData.hours || !formData.description.trim()) return;

		setIsSubmitting(true);

		// In production: await dispatch(logTaskTime({ taskId, ...formData }))
		// Example: await api.post(`/tasks/${taskId}/time`, formData);

		setTimeout(() => {
			setIsSubmitting(false);
			setFormData({ hours: '', description: '' });
		}, 1000);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-5">
			<div className="space-y-2">
				<Label htmlFor="hours" className="text-sm font-semibold text-slate-900">
					Hours Logged
				</Label>
				<Input
					id="hours"
					type="number"
					min="0.1"
					step="0.1"
					value={formData.hours}
					onChange={(e) => setFormData({ ...formData, hours: e.target.value ? Number(e.target.value) : '' })}
					placeholder="e.g. 2.5"
					className="bg-white border-slate-200 focus-visible:ring-indigo-500/20 shadow-sm h-10"
					required
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="desc" className="text-sm font-semibold text-slate-900">
					Description
				</Label>
				<Textarea
					id="desc"
					value={formData.description}
					onChange={(e) => setFormData({ ...formData, description: e.target.value })}
					placeholder="What did you work on?"
					className="bg-white border-slate-200 focus-visible:ring-indigo-500/20 shadow-sm resize-none min-h-[100px]"
					required
				/>
			</div>

			<Button
				type="submit"
				disabled={isSubmitting || !formData.hours || !formData.description.trim()}
				className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg h-10 shadow-sm transition-all"
			>
				{isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
				{isSubmitting ? 'Logging...' : 'Log Time'}
			</Button>
		</form>
	);
}
