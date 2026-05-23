// components/Pagination.tsx
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	totalItems: number;
	itemsPerPage: number;
}

export function Pagination({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }: PaginationProps) {
	const startItem = (currentPage - 1) * itemsPerPage + 1;
	const endItem = Math.min(currentPage * itemsPerPage, totalItems);

	return (
		<div className="flex items-center justify-between border-t px-4 py-4 sm:px-6 mt-4">
			<div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between text-sm text-gray-500">
				<div>
					Showing <span className="font-medium text-gray-900">{startItem}</span> to{' '}
					<span className="font-medium text-gray-900">{endItem}</span> of{' '}
					<span className="font-medium text-gray-900">{totalItems}</span> projects
				</div>
				<div className="flex items-center space-x-2">
					<button
						onClick={() => onPageChange(currentPage - 1)}
						disabled={currentPage === 1}
						className="p-2 border rounded-md disabled:opacity-50 hover:bg-gray-50"
					>
						<ChevronLeft className="h-4 w-4" />
					</button>

					{[...Array(totalPages)].map((_, i) => {
						const page = i + 1;
						return (
							<button
								key={page}
								onClick={() => onPageChange(page)}
								className={`px-3 py-1 text-sm rounded-md ${
									currentPage === page
										? 'bg-indigo-600 text-white'
										: 'border hover:bg-gray-50 text-gray-700'
								}`}
							>
								{page}
							</button>
						);
					})}

					<button
						onClick={() => onPageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
						className="p-2 border rounded-md disabled:opacity-50 hover:bg-gray-50"
					>
						<ChevronRight className="h-4 w-4" />
					</button>

					<select className="ml-4 border rounded-md text-sm py-1 px-2 focus:outline-none focus:ring-1 focus:ring-indigo-500">
						<option>6 / page</option>
						<option>12 / page</option>
					</select>
				</div>
			</div>
		</div>
	);
}
