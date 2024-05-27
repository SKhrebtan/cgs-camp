import * as Yup from 'yup';

export const formResetSchema = Yup.object({
	password: Yup.string()
		.min(6, 'Password must be 6 characters or more')
		.max(15, 'Password must be 15 characters or less')
		.required('Password is required'),
	repeatPassword: Yup.string()
		.min(6, 'Password must be 6 characters or more')
		.max(15, 'Password must be 15 characters or less')
		.required('Password is required'),
});
