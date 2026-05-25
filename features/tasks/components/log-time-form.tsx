'use client';

import { logTimeAction } from '@/actions/time-log-action';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { useActionState, useEffect, useRef } from 'react';

interface LogTimeFormProps {
	taskId: string;
	onTimeLogged?: () => void; // Optional callback if you want to instantly refresh a sibling component later
}

export function LogTimeForm({ taskId, onTimeLogged }: LogTimeFormProps) {
	// Bind the taskId to the Server Action
	const logTimeWithId = logTimeAction.bind(null, taskId);
	const [state, formAction, isPending] = useActionState(logTimeWithId, null);

	const formRef = useRef<HTMLFormElement>(null);

	// Watch for successful submission to clear the form
	useEffect(() => {
		if (state?.success && state?.clearForm) {
			formRef.current?.reset();

			// If you pass a refresh function from the parent later, it triggers here
			if (onTimeLogged) {
				onTimeLogged();
			}
		}
	}, [state?.clearForm, state?.success, onTimeLogged]);

	return (
		<form
			ref={formRef}
			action={formAction}
			className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-4"
		>
			<h3 className="text-base font-bold text-slate-900 mb-2">Log Time</h3>

			{/* Display Error Message */}
			{state?.error && (
				<div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100">{state.error}</div>
			)}

			{/* Display Success Message (Temporarily before they start typing again) */}
			{state?.success && !state?.error && (
				<div className="p-3 text-sm text-emerald-700 bg-emerald-50 rounded-lg border border-emerald-100">
					{state.message}
				</div>
			)}

			<div className="space-y-1.5">
				<Label htmlFor="hoursLogged" className="text-xs font-semibold text-slate-600">
					Hours Logged
				</Label>
				<Input
					id="hoursLogged"
					name="hoursLogged"
					type="number"
					step="0.5"
					min="0.5"
					required
					placeholder="e.g. 2.5"
					className="bg-white border-slate-200"
				/>
			</div>

			<div className="space-y-1.5">
				<Label htmlFor="description" className="text-xs font-semibold text-slate-600">
					Description
				</Label>
				<Textarea
					id="description"
					name="description"
					required
					placeholder="What did you work on?"
					className="bg-white border-slate-200 resize-none min-h-[80px]"
				/>
			</div>

			<Button
				type="submit"
				disabled={isPending}
				className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-10 shadow-sm mt-2 transition-all"
			>
				{isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
				{isPending ? 'Logging...' : 'Log Time'}
			</Button>
		</form>
	);
}
