import { create } from 'zustand';

import { getToken, removeToken } from '@/services/auth';
import { UserInfo } from '@/types/user.type';

interface AuthState {
	user: UserInfo | null;
	isAuthenticated: boolean;
	setUser: (user: UserInfo) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => {
	const { token, currentUser } = getToken();

	if (token && currentUser) {
		return {
			user: currentUser,
			isAuthenticated: true,
			setUser: (user) => set({ user, isAuthenticated: true }),
			logout: () => {
				removeToken();
				set({ user: null, isAuthenticated: false });
			},
		};
	}

	return {
		user: null,
		isAuthenticated: false,
		setUser: (user) => set({ user, isAuthenticated: true }),
		logout: () => {
			removeToken();
			set({ user: null, isAuthenticated: false });
		},
	};
});
