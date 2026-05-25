'use client';

import { createUserAction } from '@/actions/user.action';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useActionState, useEffect, useRef } from 'react';

export function CreateUserForm() {
	const [state, formAction, isPending] = useActionState(createUserAction, null);
	const formRef = useRef<HTMLFormElement>(null);

	useEffect(() => {
		if (state?.success && state?.clearForm) {
			formRef.current?.reset();
		}
	}, [state?.clearForm, state?.success]);

	return (
		<form
			ref={formRef}
			action={formAction}
			className="space-y-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
		>
			<h2 className="text-xl font-bold text-slate-900">Create New Team Member</h2>

			{state?.error && <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">{state.error}</div>}
			{state?.success && (
				<div className="p-3 text-sm text-emerald-700 bg-emerald-50 rounded-lg">{state.message}</div>
			)}

			<div className="space-y-4">
				<div className="space-y-1.5">
					<Label htmlFor="name">Full Name</Label>
					<Input id="name" name="name" required placeholder="John Doe" />
				</div>

				<div className="space-y-1.5">
					<Label htmlFor="email">Email Address</Label>
					<Input id="email" name="email" type="email" required placeholder="john@example.com" />
				</div>

				<div className="space-y-1.5">
					<Label htmlFor="password">Temporary Password</Label>
					<Input id="password" name="password" type="password" required />
				</div>

				<div className="space-y-1.5">
					<Label htmlFor="role">Role</Label>
					<select
						id="role"
						name="role"
						required
						className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
					>
						<option value="MEMBER">Member</option>
						<option value="MANAGER">Manager</option>
						<option value="ADMIN">Admin</option>
					</select>
				</div>
			</div>

			<Button type="submit" disabled={isPending} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
				{isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
				{isPending ? 'Creating...' : 'Create User'}
			</Button>
		</form>
	);
}
