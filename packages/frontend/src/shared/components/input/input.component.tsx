import React, { ReactNode } from 'react';

interface CustomInputProps {
	children: ReactNode;
	inuptStyles: string;
	name: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
	value: string;
}
export const CustomInput: React.FC<CustomInputProps> = ({
	children,
	inuptStyles,
	name,
	onChange,
	onBlur,
	value,
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
			{children}
		</div>
	);
};
