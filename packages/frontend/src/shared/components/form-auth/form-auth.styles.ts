import { css } from '@emotion/css';
import { THEME_CSS } from '~/common/constants/styles';
export const formStyles = css`
	max-width: 400px;
	margin: 0 auto;
	padding: 20px;
	border: 1px solid ${THEME_CSS.colors.borderColor};
	border-radius: 5px;
	box-shadow: ${THEME_CSS.colors.formShadows};
	background-color: ${THEME_CSS.colors.formBackground};
`;

export const inuptStyles = css`
	width: 100%;
	padding: 8px;
	margin-bottom: 10px;
	border: 1px solid ${THEME_CSS.colors.borderColor};
	border-radius: 3px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const textareaStyles = css`
	height: 60px;
`;

export const btnBlockStyles = css`
	display: flex;
	justify-content: center;
	gap: 30px;
`;

export const error = css`
	color: ${THEME_CSS.colors.errorColor};
	font-size: 14px;
	margin-top: 5px;
`;

export const success = css`
	color: ${THEME_CSS.colors.textSuccessColor};
	font-size: 14px;
	margin-top: 5px;
`;
