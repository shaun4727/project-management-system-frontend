import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
	title: string;
	value: string | number;
	icon: LucideIcon;
}

// Server Component (No 'use client' directive)
export function StatCard({ title, value, icon: Icon }: StatCardProps) {
	return (
		<Card className="gsap-item p-5 border-slate-100 shadow-sm bg-white rounded-2xl flex flex-col gap-3">
			<div className="flex items-center gap-2 text-indigo-600">
				<Icon className="h-4 w-4" />
				<span className="text-sm font-semibold text-slate-600">{title}</span>
			</div>
			<div className="text-3xl font-bold text-slate-900">{value}</div>
		</Card>
	);
}
