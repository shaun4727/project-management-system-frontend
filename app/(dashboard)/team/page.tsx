import { AnimatedContainer } from '@/components/shared/animatedContainer';
import { CreateUserForm } from '@/features/users/components/create-user-form';

export default async function TeamPage() {
	// You can also fetch the list of existing users here and pass them to a <UserList /> component

	return (
		<AnimatedContainer className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8">
			<div>
				<h1 className="text-2xl font-bold text-slate-900">Team Management</h1>
				<p className="text-sm text-slate-500">Add new users and manage access roles.</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{/* Left Side: Creation Form */}
				<div>
					<CreateUserForm />
				</div>

				{/* Right Side: Instructions or Future User List */}
				<div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 h-fit">
					<h3 className="font-bold text-slate-900 mb-2">Role Permissions</h3>
					<ul className="space-y-3 text-sm text-slate-600">
						<li>
							<strong className="text-slate-900">Admin:</strong> Full access to all projects, team
							creation, and system settings.
						</li>
						<li>
							<strong className="text-slate-900">Manager:</strong> Can create projects, sprints, and
							assign tasks.
						</li>
						<li>
							<strong className="text-slate-900">Member:</strong> Can view assigned tasks, update task
							status, and log time.
						</li>
					</ul>
				</div>
			</div>
		</AnimatedContainer>
	);
}
