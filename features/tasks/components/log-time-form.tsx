'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

// CLIENT COMPONENT (Manages Form State)
export function LogTimeForm() {
	const [hours, setHours] = useState('2.5');
	const [description, setDescription] = useState('Implemented user management API endpoints.');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		// Simulate API call
		setTimeout(() => setIsSubmitting(false), 800);
	};

	return (
		<form onSubmit={handleSubmit} className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-4">
			<h3 className="text-base font-bold text-slate-900 mb-2">Log Time</h3>

			<div className="space-y-1.5">
				<Label htmlFor="hours" className="text-xs font-semibold text-slate-600">
					Hours Logged
				</Label>
				<Input
					id="hours"
					type="number"
					step="0.5"
					value={hours}
					onChange={(e) => setHours(e.target.value)}
					className="bg-white border-slate-200"
				/>
			</div>

			<div className="space-y-1.5">
				<Label htmlFor="desc" className="text-xs font-semibold text-slate-600">
					Description
				</Label>
				<Textarea
					id="desc"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className="bg-white border-slate-200 resize-none min-h-[80px]"
				/>
			</div>

			<Button
				type="submit"
				disabled={isSubmitting}
				className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-10 shadow-sm mt-2"
			>
				{isSubmitting ? 'Logging...' : 'Log Time'}
			</Button>
		</form>
	);
}
