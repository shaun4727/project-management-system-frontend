'use client';

import { deleteProjectAction } from '@/actions/project/project.action';
import { Pagination } from '@/components/shared/pagination';
import { Button } from '@/components/ui/button';
import { gsap } from 'gsap';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { startTransition, useEffect, useRef, useState } from 'react';
import { ProjectModal } from './create-project-modal';

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
	const [modalKey, setModalKey] = useState(0);

	// Modal State Management
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingProject, setEditingProject] = useState<RealProject | null>(null);

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

	const handleOpenCreate = () => {
		setEditingProject(null);
		setModalKey((prev) => prev + 1); // Update key to wipe old state
		setIsModalOpen(true);
	};

	const handleOpenEdit = (e: React.MouseEvent, project: RealProject) => {
		e.stopPropagation();
		setEditingProject(project);
		setModalKey((prev) => prev + 1); // Update key to wipe old state
		setIsModalOpen(true);
	};

	const handleDelete = (e: React.MouseEvent, id: string) => {
		e.stopPropagation(); // Prevent row click navigation
		if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
			// Use startTransition to trigger the Server Action without blocking UI
			startTransition(() => {
				deleteProjectAction(id);
			});
		}
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
				<Button
					onClick={handleOpenCreate}
					className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm gap-2"
				>
					<Plus className="h-4 w-4" /> New Project
				</Button>
			</div>

			{/* Mount the unified modal here with the dynamic key */}
			<ProjectModal
				key={modalKey}
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				project={editingProject}
			/>

			{/* Data Table */}
			<div className="overflow-x-auto bg-white border border-slate-200 rounded-xl shadow-sm">
				<table className="w-full text-left text-sm text-gray-600">
					<thead className="text-xs text-gray-400 font-medium border-b border-gray-100 bg-slate-50/50">
						<tr>
							<th className="py-4 px-4 font-medium">Project</th>
							<th className="py-4 px-4 font-medium">Client</th>
							<th className="py-4 px-4 font-medium">Status</th>
							<th className="py-4 px-4 font-medium text-right">Actions</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-50">
						{initialProjects.map((project) => (
							<tr
								key={project.id}
								onClick={() => router.push(`/projects/${project.id}`)}
								className="table-row-item group hover:bg-slate-50 transition-colors cursor-pointer"
							>
								<td className="py-4 px-4">
									<div className="flex items-center space-x-3">
										<div className="w-10 h-10 rounded-lg bg-indigo-100 flex-shrink-0" />
										<div>
											<span className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
												{project.title}
											</span>
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
								<td className="py-4 px-4 text-right">
									<div className="flex items-center justify-end gap-3 opacity-50 group-hover:opacity-100 transition-opacity">
										<button
											onClick={(e) => handleOpenEdit(e, project)}
											className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
											title="Edit Project"
										>
											<Pencil className="h-4 w-4" />
										</button>
										<button
											onClick={(e) => handleDelete(e, project.id)}
											className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
											title="Delete Project"
										>
											<Trash2 className="h-4 w-4" />
										</button>
									</div>
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
