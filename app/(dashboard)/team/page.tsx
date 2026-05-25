import { getCurrentUserAction } from '@/actions/auth.actions';
import { getUsersAction } from '@/actions/user.action';
import { AnimatedContainer } from '@/components/shared/animatedContainer';
import { RoleGuard } from '@/components/shared/role-guard';
import { CreateUserForm } from '@/features/users/components/create-user-form';
import { UserList } from '@/features/users/components/users-list';

export default async function TeamPage() {
	// Fetch both the current user and all users in parallel for maximum performance
	const [currentUserRes, allUsersRes] = await Promise.all([getCurrentUserAction(), getUsersAction()]);

	const currentUser = currentUserRes.success ? currentUserRes.data : null;
	const allUsers = allUsersRes.success ? allUsersRes.data : [];

	// Filter out the logged-in admin so they don't see themselves in the "Team Members" list
	const filteredUsers = allUsers.filter((user: any) => user.email !== currentUser?.email);

	return (
		<AnimatedContainer className="max-w-6xl mx-auto p-4 sm:p-6 space-y-8 h-full">
			<div>
				<h1 className="text-2xl font-bold text-slate-900">Team Management</h1>
				<p className="text-sm text-slate-500">Add new users and manage access roles.</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
				{/* Left Side: Creation Form (Takes up 5 columns on large screens) */}
				<div className="lg:col-span-5">
					<RoleGuard allowedRoles={['ADMIN']}>
						<CreateUserForm />
					</RoleGuard>

					{/* Kept the Permissions guide for reference */}
					<div className="mt-6 bg-slate-50 rounded-2xl p-6 border border-slate-200">
						<h3 className="font-bold text-slate-900 mb-2">Role Permissions</h3>
						<ul className="space-y-3 text-sm text-slate-600">
							<li>
								<strong className="text-slate-900">Admin:</strong> Full system access.
							</li>
							<li>
								<strong className="text-slate-900">Manager:</strong> Can create projects/sprints.
							</li>
							<li>
								<strong className="text-slate-900">Member:</strong> Can update tasks and log time.
							</li>
						</ul>
					</div>
				</div>

				{/* Right Side: Animated User List (Takes up 7 columns on large screens) */}
				<div className="lg:col-span-7">
					<UserList users={filteredUsers} />
				</div>
			</div>
		</AnimatedContainer>
	);
}
