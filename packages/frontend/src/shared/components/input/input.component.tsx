import React from 'react';

interface CustomInputProps {
	inuptStyles?: string;
	name: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
	value: string;
	formikTouched?: boolean;
	formikError?: string;
	type?: string;
	placeholder?: string;
	filter?: true;
}
export const CustomInput: React.FC<CustomInputProps> = ({
	inuptStyles,
	name,
	onChange,
	onBlur,
	value,
	formikTouched,
	formikError,
	type = 'text',
	placeholder,
	filter,
}) => {
	return (
		<div className={inuptStyles}>
			<label htmlFor={name}>{!filter && name}</label>
			<input
				className="bp5-input bp5-round"
				id={name}
				name={name}
				type={type}
				onChange={onChange}
				onBlur={onBlur}
				value={value}
				placeholder={placeholder}
			/>

			{formikTouched && formikError ? <div>{formikError}</div> : null}
		</div>
	);
};
