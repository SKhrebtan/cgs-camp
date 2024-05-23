import * as React from 'react';
import { Loader } from '../loader/loader.component';
import classNames from 'classnames';
import {
	btnContentWrapper,
	btnStyles,
	iconWrapper,
	mr,
} from './custom-button.styles';

type IButtonProps = {
	text: string;
	type?: 'button' | 'submit' | 'reset';
	onClick?: () => void;
	loading?: boolean;
	disabled?: boolean;
	extraButtonStyles?: string | object;
	icon?: React.ReactNode;
	isViewButton?: boolean;
};

export const CustomButton: React.FunctionComponent<IButtonProps> = ({
	text,
	type = 'submit',
	onClick,
	loading,
	disabled,
	extraButtonStyles,
	icon,
	isViewButton,
}) => {
	const isDisabled = Boolean(loading ?? disabled);

	const handleClick = (): void => {
		if (isDisabled) {
			return;
		}
		onClick?.();
	};
	return (
		<button
			disabled={isDisabled}
			type={type}
			onClick={handleClick}
			className={classNames(
				btnStyles(Boolean(disabled), isViewButton),
				extraButtonStyles,
			)}
		>
			{Boolean(loading) ? (
				<Loader />
			) : (
				<span className={btnContentWrapper}>
					{icon && (
						<span
							className={classNames(iconWrapper, {
								[mr]: Boolean(text),
							})}
						>
							{icon}
						</span>
					)}
					{text}
				</span>
			)}
		</button>
	);
};
