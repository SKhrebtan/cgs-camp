import { css } from '@emotion/css';
import { THEME_CSS } from '~/common/constants/styles';
export const formStyles = css`
	width: 360px;
	margin: 0 auto;
	padding: 20px;
	border: 1px solid #ccc;
	border-radius: 5px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	background-color: #f9f9f9;
`;

export const inuptStyles = css`
	width: 100%;
	padding: 8px;
	margin-bottom: 10px;
	border: 1px solid #ccc;
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

export const errorStyles = css`
	color: ${THEME_CSS.colors.deleteColor};
	font-size: 14px;
	margin-top: 5px;
`;

export const successStyles = css`
	color: ${THEME_CSS.colors.activeColor};
	font-size: ${THEME_CSS.text.fontText};
	margin-top: 5px;
`;
