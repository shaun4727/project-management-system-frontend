import { LoginForm } from '@/features/auth/components/login-form';

export const page = async () => {
	return (
		<main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
			<LoginForm />
		</main>
	);
};

export default page;
