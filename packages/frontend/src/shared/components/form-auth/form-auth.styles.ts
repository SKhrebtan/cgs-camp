import { css } from '@emotion/css';

export const formStyles = css`
	max-width: 400px;
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

export const error = css`
	color: #dc3545;
	font-size: 14px;
	margin-top: 5px;
`;
