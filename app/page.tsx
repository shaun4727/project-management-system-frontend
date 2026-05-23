'use client';

import { Card } from '@/components/ui/card'; // Assuming shadcn is installed
import gsap from 'gsap';
import { CheckSquare, Clock, FolderKanban } from 'lucide-react';
import { useLayoutEffect, useRef } from 'react';

export default function DashboardPage() {
	const containerRef = useRef<HTMLDivElement>(null);

	// GSAP Stagger Reveal for all widgets
	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				'.gsap-widget',
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
			);
		}, containerRef);
		return () => ctx.revert();
	}, []);

	return (
		<div ref={containerRef} className="space-y-6">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 gsap-widget">
				<div>
					<h1 className="text-2xl font-bold text-slate-900">Welcome back, Alex 👋</h1>
					<p className="text-sm text-slate-500 mt-1">Here's what happening with your projects today.</p>
				</div>
				<select className="bg-white border border-slate-200 text-sm rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
					<option>Filter: This Month</option>
				</select>
			</div>

			{/* Stats Row */}
			<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
				{[
					{ label: 'Total Projects', value: '24', icon: FolderKanban },
					{ label: 'My Active Tasks', value: '36', icon: CheckSquare },
					{ label: 'Tasks Completed', value: '128', icon: CheckSquare },
					{ label: 'Total Hours Logged', value: '245h', icon: Clock },
				].map((stat, i) => (
					<Card
						key={i}
						className="gsap-widget p-5 border-slate-100 shadow-sm hover:shadow-md transition-shadow bg-white rounded-2xl"
					>
						<div className="flex items-center gap-2 text-indigo-600 mb-3">
							<stat.icon className="h-4 w-4" />
							<span className="text-sm font-semibold text-slate-600">{stat.label}</span>
						</div>
						<div className="text-3xl font-bold text-slate-900">{stat.value}</div>
					</Card>
				))}
			</div>

			{/* Middle Row: Charts & Activity */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card className="gsap-widget p-6 border-slate-100 shadow-sm bg-white rounded-2xl min-h-[300px] flex flex-col">
					<h3 className="text-base font-bold text-slate-900 mb-6">Projects Overview</h3>
					{/* Recharts PieChart component will go here */}
					<div className="flex-1 flex items-center justify-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
						<span className="text-slate-400 text-sm">Chart Placeholder</span>
					</div>
				</Card>

				<Card className="gsap-widget p-6 border-slate-100 shadow-sm bg-white rounded-2xl">
					<div className="flex justify-between items-center mb-6">
						<h3 className="text-base font-bold text-slate-900">Recent Activity</h3>
						<button className="text-sm text-indigo-600 font-medium">View all</button>
					</div>
					{/* Activity List mapping will go here */}
					<div className="space-y-4">
						<div className="flex items-center gap-3">
							<div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
								JD
							</div>
							<p className="text-sm text-slate-600 flex-1">
								<span className="font-semibold text-slate-900">John Doe</span> moved Login API task to
								In Progress
							</p>
							<span className="text-xs text-slate-400">2m ago</span>
						</div>
					</div>
				</Card>
			</div>

			{/* Bottom Row */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card className="gsap-widget p-6 border-slate-100 shadow-sm bg-white rounded-2xl min-h-[250px]">
					<h3 className="text-base font-bold text-slate-900 mb-6">My Tasks</h3>
					{/* Tasks List goes here */}
				</Card>

				<Card className="gsap-widget p-6 border-slate-100 shadow-sm bg-white rounded-2xl min-h-[250px] flex flex-col">
					<div className="flex justify-between items-center mb-6">
						<h3 className="text-base font-bold text-slate-900">Productivity</h3>
						<select className="bg-slate-50 border border-slate-200 text-xs rounded-md px-2 py-1">
							<option>This Month</option>
						</select>
					</div>
					{/* Recharts AreaChart component will go here */}
					<div className="flex-1 bg-slate-50 rounded-xl border border-dashed border-slate-200 flex items-center justify-center">
						<span className="text-slate-400 text-sm">Productivity Graph Placeholder</span>
					</div>
				</Card>
			</div>
		</div>
	);
}
