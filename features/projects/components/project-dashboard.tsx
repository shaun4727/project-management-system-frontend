'use client';

import { Pagination } from '@/components/shared/pagination';
import { gsap } from 'gsap';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { CreateProjectModal } from './create-project-modal';

// Define the shape of your real project data
interface RealProject {
	id: string;
	title: string;
	client: string;
	description: string;
	status: string;
	progress: number; // You might need to calculate this frontend or backend
	startDate: string;
	endDate: string;
	budget: number;
	// ... add other fields matching your Prisma schema
}

interface ProjectDashboardProps {
	initialProjects: RealProject[];
	paginationMeta: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
}

// Ensure you export default and accept props
export default function ProjectDashboard({ initialProjects, paginationMeta }: ProjectDashboardProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const router = useRouter();
	const searchParams = useSearchParams();

	const currentTab = searchParams.get('status') || 'All Projects';

	// GSAP Animation setup
	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from('.stat-card', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' });
			gsap.from('.table-row-item', {
				x: -20,
				opacity: 0,
				duration: 0.5,
				stagger: 0.05,
				ease: 'power2.out',
				delay: 0.2,
			});
		}, containerRef);
		return () => ctx.revert();
	}, [initialProjects]); // Re-trigger table animation when data changes

	// Handle Server-Side Pagination
	const handlePageChange = (newPage: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set('page', newPage.toString());
		router.push(`/projects?${params.toString()}`);
	};

	// Handle Filtering
	const handleTabChange = (tab: string) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set('status', tab);
		params.set('page', '1'); // Reset to page 1 when changing filters
		router.push(`/projects?${params.toString()}`);
	};

	return (
		<div ref={containerRef} className="p-4 sm:p-6 lg:p-8 w-full max-w-7xl mx-auto min-h-screen">
			{/* Header Area */}
			<div className="flex justify-between items-end mb-8">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">Projects</h1>
					<p className="text-sm text-gray-500 mt-1">Manage and track all your projects in one place.</p>
				</div>
			</div>

			{/* Controls & Tabs */}
			<div className="flex justify-between items-center mb-8">
				<div className="flex space-x-6 border-b w-full max-w-md">
					{['All Projects', 'Active', 'Completed', 'Archived'].map((tab) => (
						<button
							key={tab}
							onClick={() => handleTabChange(tab)}
							className={`pb-3 text-sm font-medium transition-colors ${
								currentTab === tab
									? 'text-indigo-600 border-b-2 border-indigo-600'
									: 'text-gray-500 hover:text-gray-700'
							}`}
						>
							{tab}
						</button>
					))}
				</div>
				<CreateProjectModal />
			</div>

			{/* Data Table */}
			<div className="overflow-x-auto bg-white border border-slate-200 rounded-xl shadow-sm">
				<table className="w-full text-left text-sm text-gray-600">
					<thead className="text-xs text-gray-400 font-medium border-b border-gray-100 bg-slate-50/50">
						<tr>
							<th className="py-4 px-4 font-medium">Project</th>
							<th className="py-4 px-4 font-medium">Client</th>
							<th className="py-4 px-4 font-medium">Status</th>
							{/* ... (rest of your headers) ... */}
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-50">
						{/* MAP OVER REAL DATA */}
						{initialProjects.map((project) => (
							<tr
								key={project.id}
								onClick={() => router.push(`/projects/${project.id}`)}
								className="table-row-item hover:bg-gray-50/50 transition-colors cursor-pointer"
							>
								<td className="py-4 px-4">
									<div className="flex items-center space-x-3">
										<div className={`w-10 h-10 rounded-lg bg-indigo-100 flex-shrink-0`} />
										<div>
											{/* Link to specific project details using Project ID */}
											<Link
												href={`/projects/${project.id}`}
												className="font-medium text-gray-900 hover:text-indigo-600"
											>
												{project.title}
											</Link>
											<p className="text-xs text-gray-500 truncate max-w-[150px]">
												{project.description}
											</p>
										</div>
									</div>
								</td>
								<td className="py-4 px-4 text-gray-600">{project.client}</td>
								<td className="py-4 px-4">
									<span className="px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
										{project.status}
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Connect Real Pagination Data */}
			<Pagination
				currentPage={paginationMeta.page}
				totalPages={paginationMeta.totalPages}
				totalItems={paginationMeta.total}
				itemsPerPage={paginationMeta.limit}
				onPageChange={handlePageChange}
			/>
		</div>
	);
}
