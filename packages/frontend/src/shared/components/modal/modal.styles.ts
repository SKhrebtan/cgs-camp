import { css } from '@emotion/css';
import { THEME_CSS } from '../../../common/constants/styles';

export const wrapperStyles = css`
	background-color: ${THEME_CSS.colors.modalWrapperBg};
	height: 100vh;
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999;
`;

export const modalStyles = css`
	padding: 20px;
	width: 360px;
	display: flex;
	flex-direction: column;
	gap: 20px;
	background-color: ${THEME_CSS.colors.modalBackground};
	border: 1px solid black;
	border-radius: 20px;
	position: relative;
`;

export const crossStyles = css`
	width: 28px;
	height: 28px;
	position: absolute;
	top: 14px;
	right: 14px;
	transition: all 300ms linear;
	&:hover {
		cursor: pointer;
		transform: scale(1.2) rotate(180deg);
	}
`;
