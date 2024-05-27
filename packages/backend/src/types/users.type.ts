export type UserType = {
	id?: number;
	email: string;
	password?: string;
	token?: string | null | undefined;
	verified?: boolean;
	verificationToken?: string | null | undefined;
};
