import { css } from '@emotion/css';
import { THEME_CSS } from '~/common/constants/styles';

export const settingsContainerStyles = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
	background-color: #f9f9f9;
	border: 1px solid #ddd;
	border-radius: 8px;
	max-width: 400px;
	margin: 0 auto;
	box-shadow: ${THEME_CSS.colors.resetShadows};

	button {
		padding: 10px 20px;
		font-size: 16px;
		color: #fff;
		background-color: ${THEME_CSS.colors.buttonColor};
		border: none;
		border-radius: 4px;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}
	button:hover {
		background-color: ${THEME_CSS.colors.buttonHoverColor};
	}
`;

export const messageStyles = css`
	font-size: 16px;
	color: ${THEME_CSS.colors.textSuccessColor};
	margin-top: 10px;
`;
export const errorStyles = css`
	font-size: 16px;
	color: ${THEME_CSS.colors.deleteColor};
	margin-top: 10px;
`;

export const emailStyles = css`
	font-size: 18px;
	color: ${THEME_CSS.colors.textColor};
	margin-bottom: 16px;
`;
