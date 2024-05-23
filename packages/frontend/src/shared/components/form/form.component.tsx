import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAddNewTodo, useUpdateTodo } from '../../services/todos/tanstack.js';
import { formStyles, inuptStyles, btnBlockStyles } from './form.styles.js';
import { useEffect } from 'react';
import { Todo } from '~/types/todo.type.js';

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
		validationSchema: Yup.object({
			title: Yup.string()
				.max(50, 'Title must be 20 characters or less')
				.required('Title is required'),
			description: Yup.string()
				.max(200, 'Description must be 100 characters or less')
				.required('Description is required'),
		}),
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
			<div className={inuptStyles}>
				<label htmlFor="title">Title</label>
				<input
					className="bp5-input bp5-round"
					id="title"
					name="title"
					type="text"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.title}
				/>
				{formik.touched.title && formik.errors.title ? (
					<div>{formik.errors.title}</div>
				) : null}
			</div>
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
