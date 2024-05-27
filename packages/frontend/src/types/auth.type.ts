export type Auth = {
	email: string;
	password: string;
};

export interface ResetPasswordResponse {
	message: string;
}
export interface LoginResponse {
	email: string;
	token: string;
}
