import { fetchProjects } from '@/actions/project/project.action';
import ProjectDashboard from '@/features/projects/components/project-dashboard';

export default async function ProjectsPage({ searchParams }: { searchParams: { page?: string; status?: string } }) {
	// Await searchParams in Next.js 15+ if applicable, otherwise read directly
	const params = await searchParams;
	const currentPage = Number(params?.page) || 1;
	const statusFilter = params?.status || 'All Projects';

	let initialData = null;
	try {
		const response = await fetchProjects(currentPage, 6, statusFilter);
		initialData = response.data;
		console.log(initialData);
	} catch (error) {
		return <div className="p-8 text-red-500">Failed to load projects.</div>;
	}

	return (
		// Pass the fetched data down to your Client Component
		<ProjectDashboard initialProjects={initialData.projects} paginationMeta={initialData.meta} />
	);
}
