import { HttpService } from '../http-service';
import { Auth, ResetPasswordResponse, LoginResponse } from '~/types/auth.type';
import { ResetPassword } from '~/types/reset-password';

export const TOKEN_KEY = 'token';

class AuthService extends HttpService {
	#token = null;
	constructor() {
		super();
	}
	isLoggedIn(): boolean {
		return Boolean(this.#token);
	}

	getToken(): string | null {
		return this.#token;
	}
	setToken(token: string): void {
		localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
		this.#token = token;
	}
	clearToken(): void {
		this.#token = null;
		localStorage.removeItem(TOKEN_KEY);
	}
	async login(body: Auth): Promise<LoginResponse> {
		const { data } = await this.post({ url: 'user/login', data: body });
		const { token } = data;
		this.setToken(token);
		return data;
	}
	async register(body: Auth): Promise<void> {
		await this.post({ url: 'user/register', data: body });
	}
	async logout(): Promise<void> {
		await this.post({ url: 'user/logout' });
		this.clearToken();
	}
	async forgotPassword(email): Promise<ResetPasswordResponse> {
		const { data } = await this.post({
			url: 'user/forgot-password',
			data: { email },
		});
		return data;
	}

	async setNewPassword(body: ResetPassword): Promise<ResetPasswordResponse> {
		const { data } = await this.post({
			url: 'user/reset-password',
			data: body,
		});
		return data;
	}

	async current(): Promise<{ email: string }> {
		const { data } = await this.get({
			url: 'user/current',
		});
		return data;
	}
}

export const authService = new AuthService();
