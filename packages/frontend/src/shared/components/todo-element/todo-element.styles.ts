import { css } from '@emotion/css';
import { THEME_CSS } from '../../../common/constants/styles';

export const liStyles = css`
	background-color: ${THEME_CSS.colors.todoBackground};
	border: 1px solid black;
	padding: 15px;
	border-radius: 10px;
	width: 360px;
	height: 200px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	@media screen and (min-width: 768px) {
		width: 320px;
	}
`;

export const infoBlockStyles = css`
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: 280px;
	height: 100px;
`;

export const textStyles = css`
	font-size: ${THEME_CSS.text.fontText};
`;

export const buttonBlockStyles = css`
	display: flex;
	justify-content: space-between;
	gap: 15px;
	margin-top: 20px;
`;

export const linkStyles = css`
	color: black;
	&:hover {
		color: none;
		text-decoration: none;
		color: black;
	}

	&.active {
		color: none;
		text-decoration: none;
	}
`;
