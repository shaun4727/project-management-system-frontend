'use client';

import { getCurrentUserAction, logoutAction } from '@/actions/auth.actions';
import { Loader2, LogOut } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function UserProfileDropdown() {
	const [isOpen, setIsOpen] = useState(false);
	const [user, setUser] = useState<{ name: string; role: string } | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Fetch the logged-in user data dynamically
	useEffect(() => {
		const fetchUser = async () => {
			const res = await getCurrentUserAction();
			if (res.success && res.data) {
				setUser({ name: res.data.name, role: res.data.role });
			}
			setIsLoading(false);
		};
		fetchUser();
	}, []);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const handleLogout = async () => {
		await logoutAction();
	};

	// Calculate initials safely
	const initials = user?.name
		? user.name
				.split(' ')
				.map((n) => n[0])
				.join('')
				.substring(0, 2)
				.toUpperCase()
		: '?';

	return (
		<div className="relative" ref={dropdownRef}>
			{/* Trigger Avatar */}
			<button
				onClick={() => setIsOpen(!isOpen)}
				disabled={isLoading}
				className="h-8 w-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-xs ml-2 shadow-sm transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70 disabled:hover:scale-100"
			>
				{isLoading ? <Loader2 className="h-3 w-3 animate-spin text-indigo-500" /> : initials}
			</button>

			{/* Dropdown Menu */}
			{isOpen && user && (
				<div className="absolute right-0 mt-2 w-56 origin-top-right bg-white border border-slate-200 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 animate-in fade-in slide-in-from-top-2 duration-200">
					{/* User Info Header */}
					<div className="p-3 border-b border-slate-100 bg-slate-50 rounded-t-xl">
						<p className="text-sm font-semibold text-slate-900 truncate">{user.name}</p>
						<p className="text-xs font-medium text-slate-500 truncate capitalize">
							{user.role.toLowerCase()}
						</p>
					</div>

					{/* Logout Button Only */}
					<div className="p-1.5">
						<button
							onClick={handleLogout}
							className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium"
						>
							<LogOut className="h-4 w-4" />
							Log out
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
