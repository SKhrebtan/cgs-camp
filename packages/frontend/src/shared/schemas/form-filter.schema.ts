import * as Yup from 'yup';

export const formFilterSchema = Yup.object({
	search: Yup.string(),
});
