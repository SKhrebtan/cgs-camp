import React from 'react';

interface CustomInputProps {
	inuptStyles: string;
	name: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
	value: string;
	formikTouched?: boolean;
	formikError?: string;
}
export const CustomInput: React.FC<CustomInputProps> = ({
	inuptStyles,
	name,
	onChange,
	onBlur,
	value,
	formikTouched,
	formikError,
}) => {
	return (
		<div className={inuptStyles}>
			<label htmlFor={name}>{name}</label>
			<input
				className="bp5-input bp5-round"
				id={name}
				name={name}
				type="text"
				onChange={onChange}
				onBlur={onBlur}
				value={value}
			/>

			{formikTouched && formikError ? <div>{formikError}</div> : null}
		</div>
	);
};
