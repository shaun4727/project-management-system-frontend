'use client';

import { loginAction } from '@/actions/auth.actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { useActionState, useState } from 'react';

export function LoginForm() {
	// useActionState takes the server action and an initial state (null)
	const [state, formAction, isPending] = useActionState(loginAction, null);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const setCredentialMethod = (type: string) => {
		if (type === 'user') {
			setEmail('shaun.mononsoft@gmail.com');
			setPassword('tempPassword123');
		} else if (type === 'admin') {
			setEmail('admin@alien-tech.com');
			setPassword('supersecure123');
		}
	};

	return (
		<form
			action={formAction}
			className="space-y-5 w-full max-w-sm mx-auto p-6 bg-white rounded-2xl shadow-sm border border-slate-100"
		>
			<div className="text-center mb-6">
				<h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
				<p className="text-sm text-slate-500">Sign in to MPMS</p>
			</div>

			<div className="flex gap-3 ">
				<Button
					variant="default"
					onClick={() => setCredentialMethod('user')}
					className="bg-blue-600  hover:bg-blue-700 text-white flex items-center  justify-center gap-2 py-3 cursor-pointer"
				>
					Sign In with Member
				</Button>
				<Button
					onClick={() => setCredentialMethod('admin')}
					variant="default"
					className="bg-cyan-400 hover:bg-cyan-500 text-white flex items-center justify-center gap-2 py-3 cursor-pointer "
				>
					Sign In with Admin
				</Button>
			</div>

			{/* Display Error from Server Action */}
			{state?.error && (
				<div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg">{state.error}</div>
			)}

			<div className="space-y-1.5">
				<label className="text-sm font-semibold text-slate-700">Email</label>
				<Input
					name="email"
					type="email"
					placeholder="admin@datapollex.com"
					required
					className="bg-slate-50 border-slate-200"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>

			<div className="space-y-1.5">
				<label className="text-sm font-semibold text-slate-700">Password</label>
				<Input
					name="password"
					type="password"
					placeholder="••••••••"
					required
					className="bg-slate-50 border-slate-200"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>

			<Button
				type="submit"
				disabled={isPending}
				className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-10 rounded-xl transition-all"
			>
				{isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
				{isPending ? 'Signing in...' : 'Sign In'}
			</Button>
		</form>
	);
}
