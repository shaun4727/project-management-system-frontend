'use client';

import { useAuth } from '@/providers/auth-provider';

interface RoleGuardProps {
	children: React.ReactNode;
	allowedRoles: ('ADMIN' | 'MANAGER' | 'MEMBER')[];
}

export function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
	const { user } = useAuth();

	// If there is no user, or their role is not in the allowed list, render nothing
	if (!user || !allowedRoles.includes(user.role)) {
		return null;
	}

	return <>{children}</>;
}
