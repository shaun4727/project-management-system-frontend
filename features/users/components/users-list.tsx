'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import gsap from 'gsap';
import { Mail, Shield, User as UserIcon } from 'lucide-react';
import { useLayoutEffect, useRef } from 'react';

interface User {
	id: string;
	name: string;
	email: string;
	role: 'ADMIN' | 'MANAGER' | 'MEMBER';
}

interface UserListProps {
	users: User[];
}

export function UserList({ users = [] }: UserListProps) {
	const containerRef = useRef<HTMLDivElement>(null);

	// GSAP Stagger Animation
	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				'.user-card',
				{ opacity: 0, x: 20 },
				{ opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' },
			);
		}, containerRef);
		return () => ctx.revert(); // Cleanup for React Strict Mode
	}, [users]);

	const getInitials = (name: string) => name.substring(0, 2).toUpperCase();

	const getRoleConfig = (role: string) => {
		switch (role) {
			case 'ADMIN':
				return { color: 'bg-red-100 text-red-700', icon: Shield };
			case 'MANAGER':
				return { color: 'bg-amber-100 text-amber-700', icon: Shield };
			default:
				return { color: 'bg-slate-100 text-slate-700', icon: UserIcon };
		}
	};

	if (users.length === 0) {
		return (
			<div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-8 text-center">
				<p className="text-sm text-slate-500">No other team members found.</p>
			</div>
		);
	}

	return (
		<div ref={containerRef} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 h-fit">
			<h3 className="font-bold text-slate-900 mb-6 flex items-center justify-between">
				Team Members
				<span className="bg-indigo-100 text-indigo-700 text-xs px-2.5 py-0.5 rounded-full">{users.length}</span>
			</h3>

			<div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
				{users.map((user) => {
					const RoleIcon = getRoleConfig(user.role).icon;
					return (
						<div
							key={user.id}
							className="user-card flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-xl border border-slate-100 shadow-sm gap-4 hover:border-indigo-100 transition-colors"
						>
							<div className="flex items-center gap-3 overflow-hidden">
								<Avatar className="h-10 w-10 border-2 border-slate-50">
									<AvatarFallback className="bg-indigo-50 text-indigo-700 font-bold text-xs">
										{getInitials(user.name)}
									</AvatarFallback>
								</Avatar>
								<div className="min-w-0">
									<p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
									<div className="flex items-center text-xs text-slate-500 gap-1.5 mt-0.5">
										<Mail className="h-3 w-3 shrink-0" />
										<span className="truncate">{user.email}</span>
									</div>
								</div>
							</div>

							<Badge
								className={`${getRoleConfig(user.role).color} border-none shadow-none gap-1 shrink-0`}
							>
								<RoleIcon className="h-3 w-3" />
								{user.role.toLowerCase()}
							</Badge>
						</div>
					);
				})}
			</div>
		</div>
	);
}
