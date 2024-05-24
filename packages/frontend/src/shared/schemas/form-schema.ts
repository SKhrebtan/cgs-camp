import * as Yup from 'yup';

export const formSchema = Yup.object({
	title: Yup.string()
		.max(50, 'Title must be 20 characters or less')
		.required('Title is required'),
	description: Yup.string()
		.max(200, 'Description must be 100 characters or less')
		.required('Description is required'),
});
