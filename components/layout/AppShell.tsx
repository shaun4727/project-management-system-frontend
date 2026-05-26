'use client';

import { Bell, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { UserProfileDropdown } from '../shared/navbar/user-profile-dropdown';
import { Sidebar } from '../shared/sidebar/Sidebar';

export function AppShell({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	// Automatically close mobile menu drawer when route shifts
	useEffect(() => {
		setIsMobileMenuOpen(false);
	}, [pathname]);

	const isAuthRoute = pathname === '/login' || pathname?.startsWith('/register');

	if (isAuthRoute) {
		return <div className="flex-1 flex flex-col">{children}</div>;
	}

	return (
		<div className="flex flex-1 h-[100vh] bg-[#f8fafc] text-slate-900 overflow-hidden font-sans">
			{/* DESKTOP SIDEBAR (Remains completely untouched) */}
			<Sidebar />

			<div className="flex-1 flex flex-col min-w-0 overflow-hidden">
				{/* TOP NAVIGATION BAR */}
				<header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0 z-10">
					<div className="flex-1 flex items-center gap-4">
						{/* --- SHADCN MOBILE RESPONSIVE DRAWER --- */}
						<Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
							<SheetTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="md:hidden -ml-2 text-slate-500 hover:text-slate-700"
								>
									<Menu className="h-5 w-5" />
									<span className="sr-only">Toggle navigation menu</span>
								</Button>
							</SheetTrigger>
							<SheetContent side="left" className="p-0 w-64 bg-white border-r border-slate-200">
								{/* Visually Hidden Title for Screen Readers accessibility compliance */}
								<SheetHeader className="sr-only">
									<SheetTitle>Navigation Menu</SheetTitle>
								</SheetHeader>
								{/* Reusing your exact Sidebar logic, forcing it visible inside the portal drawer */}
								<div className="h-full ![display:flex] w-full">
									<Sidebar isMobileWrapper />
								</div>
							</SheetContent>
						</Sheet>
					</div>

					<div className="flex items-center gap-3 sm:gap-4">
						<button className="text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-50 transition-colors">
							<Bell className="h-5 w-5" />
						</button>

						<UserProfileDropdown />
					</div>
				</header>

				{/* MAIN CONTENT AREA */}
				<main className="flex-1 overflow-y-auto pb-20 md:pb-0 relative">{children}</main>
			</div>

			{/* MOBILE BOTTOM NAVIGATION */}
			<nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-slate-200 pb-safe z-50">
				<div className="flex items-center justify-around h-16 px-2">
					<Link
						href="/"
						className="flex flex-col items-center justify-center w-full h-full space-y-1 text-indigo-600"
					>
						<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
							/>
						</svg>
						<span className="text-[10px] font-medium">Home</span>
					</Link>
					<Link
						href="/projects"
						className="flex flex-col items-center justify-center w-full h-full space-y-1 text-slate-500 hover:text-slate-900"
					>
						<span className="text-[10px] font-medium">Projects</span>
					</Link>
				</div>
			</nav>
		</div>
	);
}
