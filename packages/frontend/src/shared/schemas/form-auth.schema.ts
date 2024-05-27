import * as Yup from 'yup';

export const formAuthSchema = Yup.object({
	email: Yup.string()
		.email('Invalid email address')
		.max(50, 'Email must be 50 characters or less')
		.required('Email is required'),
	password: Yup.string()
		.min(6, 'Password must be 6 characters or more')
		.max(15, 'Password must be 15 characters or less')
		.required('Password is required'),
});
