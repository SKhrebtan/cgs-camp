import { css } from '@emotion/css';
import { THEME_CSS } from '../../../common/constants/styles';

export const buttonStyles = css`
	width: 80px;
	height: 36px;
	border: 1px solid ${THEME_CSS.colors.switcherBorderColor};
	background-color: ${THEME_CSS.colors.switcherBackground};
	border-radius: 25px;
`;

export const switcherStyles = (isCompleted: boolean): string => {
	return css`
		width: 32px;
		height: 32px;
		background-color: ${THEME_CSS.colors.activeColor};
		border-radius: 25px;
		background-color: ${isCompleted
			? THEME_CSS.colors.activeColor
			: THEME_CSS.colors.disabledColor};
	`;
};
