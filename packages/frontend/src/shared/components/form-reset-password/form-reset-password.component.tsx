import React from 'react';
import { useFormik } from 'formik';
import { formResetSchema } from '~shared/schemas/form-reset-password.schema';
import {
	formStyles,
	inuptStyles,
	btnBlockStyles,
	errorStyles,
	successStyles,
} from './form-reset-password.styles';
import { CustomInput } from '../input/input.component.js';
import { authService } from '~shared/services/auth/auth-service';
import { useState } from 'react';
interface FormResetProps {
	token: string;
}
export const FormResetPassword: React.FC<FormResetProps> = ({ token }) => {
	const [errorState, setErrorState] = useState<string | null>(null);
	const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
	const formik = useFormik({
		initialValues: {
			password: '',
			repeatPassword: '',
		},
		validationSchema: formResetSchema,
		onSubmit: async (values, { resetForm }) => {
			setErrorState(null);
			setPasswordSuccess(null);
			if (values.password !== values.repeatPassword) {
				return setErrorState('Passwords dont match');
			}

			try {
				const { message } = await authService.setNewPassword({
					token,
					newPassword: values.password,
				});
				resetForm();
				setPasswordSuccess(message);
			} catch (error) {
				setErrorState(error.message);
			}
		},
	});

	return (
		<form className={formStyles} onSubmit={formik.handleSubmit}>
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
			<CustomInput
				inuptStyles={inuptStyles}
				name="repeatPassword"
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				value={formik.values.repeatPassword}
				formikTouched={formik.touched.repeatPassword}
				formikError={formik.errors.repeatPassword}
				type="password"
			/>

			<div className={btnBlockStyles}>
				<button className="bp5-button bp5-intent-primary" type="submit">
					Set New Password
				</button>
			</div>
			{passwordSuccess && (
				<p className={successStyles}>{passwordSuccess}</p>
			)}
			{errorState && <p className={errorStyles}>{errorState}</p>}
		</form>
	);
};
