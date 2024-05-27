import React from 'react';
import { useFormik } from 'formik';
import { formAuthSchema } from '~shared/schemas/form-auth.schema.js';
import {
	formStyles,
	inuptStyles,
	btnBlockStyles,
	error,
	success,
} from './form-auth.styles';
import { CustomInput } from '../input/input.component.js';
import { useUserStore } from '~store/user.store';
import { authService } from '~shared/services/auth/auth-service';
import { useState } from 'react';
import { authInitial } from '~/common/constants/initialValues';
interface FormAuthProps {
	register: boolean;
}

export const FormAuth: React.FC<FormAuthProps> = ({ register }) => {
	const [errorState, setErrorState] = useState(null);
	const [successState, setSuccessState] = useState(null);
	const { login } = useUserStore((state) => state);
	const handleSubmit = async (
		values,
		register,
		setErrorState,
		login,
	): Promise<void> => {
		setErrorState(null);
		setSuccessState(null);
		try {
			if (register) {
				await authService.register(values);
				setSuccessState('Registartion is successfull, check email');
			} else {
				await login(values);
			}
		} catch (error) {
			setErrorState(error.message);
		}
	};
	const formik = useFormik({
		initialValues: authInitial,
		validationSchema: formAuthSchema,
		onSubmit: (values) =>
			handleSubmit(values, register, setErrorState, login),
	});

	return (
		<form className={formStyles} onSubmit={formik.handleSubmit}>
			<CustomInput
				inuptStyles={inuptStyles}
				name="email"
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				value={formik.values.email}
				formikTouched={formik.touched.email}
				formikError={formik.errors.email}
			/>
			<CustomInput
				inuptStyles={inuptStyles}
				name="password"
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				value={formik.values.password}
				formikTouched={formik.touched.password}
				formikError={formik.errors.password}
				type="password"
			/>

			<div className={btnBlockStyles}>
				<button className="bp5-button bp5-intent-primary" type="submit">
					{register ? 'Register' : 'Login'}
				</button>
			</div>
			{successState && <p className={success}>{successState}</p>}
			{errorState && <p className={error}>{errorState}</p>}
		</form>
	);
};
