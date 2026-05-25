'use client';

import { createContext, useContext } from 'react';

type User = {
	id: string;
	name: string;
	email: string;
	role: 'ADMIN' | 'MANAGER' | 'MEMBER';
};

type AuthContextType = {
	user: User | null;
};

const AuthContext = createContext<AuthContextType>({ user: null });

export function AuthProvider({ children, initialUser }: { children: React.ReactNode; initialUser: User | null }) {
	return <AuthContext.Provider value={{ user: initialUser }}>{children}</AuthContext.Provider>;
}

// Custom hook for easy access to user data anywhere in Client Components
export const useAuth = () => useContext(AuthContext);
