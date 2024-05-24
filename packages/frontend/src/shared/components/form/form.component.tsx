import React from 'react';
import { useFormik } from 'formik';
import { formSchema } from '~shared/schemas/form-schema.js';
import { useAddNewTodo, useUpdateTodo } from '../../services/todos/tanstack.js';
import { formStyles, inuptStyles, btnBlockStyles } from './form.styles.js';
import { useEffect } from 'react';
import { Todo } from '~/types/todo.type.js';
import { CustomInput } from '../input/input.component';

type FormProps = {
	id?: string;
	type?: 'edit' | 'create';
	closeModal: () => void;
	todo?: Todo;
};

export const Form: React.FC<FormProps> = ({ id, todo, type, closeModal }) => {
	const { mutate, isPending, error, isSuccess } = useAddNewTodo();
	const {
		mutate: updateMutate,
		isPending: isUpdatePending,
		error: updateError,
		isSuccess: isUpdateSuccess,
	} = useUpdateTodo();
	const formik = useFormik({
		initialValues: {
			title: type === 'edit' ? todo.title : '',
			description: type === 'edit' ? todo.description : '',
		},
		validationSchema: formSchema,
		onSubmit: async (values) => {
			type === 'edit'
				? await updateMutate({ id, body: { ...values } })
				: await mutate(values);
		},
	});
	useEffect(() => {
		if (!isSuccess && !isUpdateSuccess) return;
		closeModal();
	}, [isSuccess, isUpdateSuccess]);
	return (
		<form className={formStyles} onSubmit={formik.handleSubmit}>
			<CustomInput
				inuptStyles={inuptStyles}
				name="title"
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				value={formik.values.title}
				formikTouched={formik.touched.title}
				formikError={formik.errors.title}
			/>
			<CustomInput
				inuptStyles={inuptStyles}
				name="description"
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				value={formik.values.description}
				formikTouched={formik.touched.title}
				formikError={formik.errors.title}
			/>
			<div className={inuptStyles}>
				<label htmlFor="description">Description</label>
				<textarea
					className="bp5-input"
					id="description"
					name="description"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.description}
				/>
				{formik.touched.description && formik.errors.description ? (
					<div>{formik.errors.description}</div>
				) : null}
			</div>
			{(error || updateError) && <p>Something went wrong...</p>}
			<div className={btnBlockStyles}>
				<button
					className="bp5-button bp5-intent-danger"
					onClick={() => closeModal()}
					type="button"
				>
					Cancel
				</button>
				<button
					className="bp5-button bp5-intent-primary"
					disabled={isPending}
					type="submit"
				>
					{type === 'edit'
						? isUpdatePending
							? 'Editing...'
							: 'Edit Task'
						: isPending
							? 'Creating...'
							: 'Add Task'}
				</button>
			</div>
		</form>
	);
};
