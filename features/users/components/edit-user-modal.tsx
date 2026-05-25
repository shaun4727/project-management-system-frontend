'use client';

import { updateUserAction } from '@/actions/user.action';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useActionState, useEffect } from 'react';

interface EditUserModalProps {
	isOpen: boolean;
	onClose: () => void;
	user: any;
}

export function EditUserModal({ isOpen, onClose, user }: EditUserModalProps) {
	const updateUserWithId = user ? updateUserAction.bind(null, user.id) : null;
	const [state, formAction, isPending] = useActionState(
		updateUserWithId || (async () => ({ success: false, error: 'No user selected' })),
		null,
	);

	useEffect(() => {
		if (state?.success && state?.closeForm) {
			onClose();
		}
	}, [state?.closeForm, state?.success, onClose]);

	if (!user) return null;

	return (
		<Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<DialogContent className="sm:max-w-[425px] bg-white border-slate-200">
				<DialogHeader>
					<DialogTitle className="text-xl font-bold text-slate-900">Edit Team Member</DialogTitle>
				</DialogHeader>

				<form action={formAction} className="space-y-4 mt-4">
					{state?.error && <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">{state.error}</div>}

					<div className="space-y-1.5">
						<Label htmlFor="name">Full Name</Label>
						<Input id="name" name="name" defaultValue={user.name} required />
					</div>

					<div className="space-y-1.5">
						<Label htmlFor="email">Email Address</Label>
						<Input id="email" name="email" type="email" defaultValue={user.email} required />
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-1.5">
							<Label htmlFor="department">Department</Label>
							<Input
								id="department"
								name="department"
								defaultValue={user.department || ''}
								placeholder="Engineering"
							/>
						</div>
						<div className="space-y-1.5">
							<Label htmlFor="skills">Skills (comma separated)</Label>
							{/* Convert the array back to a string for the input field */}
							<Input
								id="skills"
								name="skills"
								defaultValue={user.skills?.join(', ') || ''}
								placeholder="React, Next.js, Node"
							/>
						</div>
					</div>

					<div className="space-y-1.5">
						<Label htmlFor="role">Role</Label>
						<select
							id="role"
							name="role"
							defaultValue={user.role}
							required
							className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
						>
							<option value="MEMBER">Member</option>
							<option value="MANAGER">Manager</option>
							<option value="ADMIN">Admin</option>
						</select>
					</div>

					<div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
						<Button type="button" variant="outline" onClick={onClose} disabled={isPending}>
							Cancel
						</Button>
						<Button
							type="submit"
							disabled={isPending}
							className="bg-indigo-600 hover:bg-indigo-700 text-white"
						>
							{isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
							{isPending ? 'Saving...' : 'Save Changes'}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
