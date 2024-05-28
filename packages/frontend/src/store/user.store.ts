import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '~shared/services/auth/auth-service';
import { Auth } from '~/types/auth.type';
import { TOKEN_KEY } from '~/common/constants/token-key';
interface IUserStore {
	token: null | string;
	email: string | null;
	login: (body: Auth) => Promise<void>;
	logout: () => Promise<void>;
	refresh: () => Promise<void>;
}

export const useUserStore = create<IUserStore>()(
	persist(
		(set) => ({
			token: JSON.parse(localStorage.getItem(TOKEN_KEY)),
			email: null,
			login: async (body): Promise<void> => {
				const data = await authService.login(body);
				set({ token: authService.getToken(), email: data.email });
			},
			logout: async (): Promise<void> => {
				try {
					await authService.logout();
					set({ token: null, email: null });
				} catch (error) {
					localStorage.removeItem('token');
					set({ token: null, email: null });
				}
			},
			refresh: async (): Promise<void> => {
				const { email } = await authService.current();
				set({ email });
			},
		}),
		{
			name: 'user-storage',
			partialize: (state) => ({ email: state.email }),
		},
	),
);
