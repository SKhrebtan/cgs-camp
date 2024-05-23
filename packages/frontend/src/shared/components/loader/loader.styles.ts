import { css, keyframes } from '@emotion/css';

const l27 = keyframes`
  100% { transform: rotate(1turn); }
`;
export const wrapperStyles = css`
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(209, 213, 219, 0.5);
`;

export const loaderStyles = css`
	--d: 88px;
	width: 16px;
	height: 16px;
	border-radius: 50%;
	color: #25b09b;
	box-shadow:
		calc(1 * var(--d)) calc(0 * var(--d)) 0 0,
		calc(0.707 * var(--d)) calc(0.707 * var(--d)) 0 1px,
		calc(0 * var(--d)) calc(1 * var(--d)) 0 2px,
		calc(-0.707 * var(--d)) calc(0.707 * var(--d)) 0 3px,
		calc(-1 * var(--d)) calc(0 * var(--d)) 0 4px,
		calc(-0.707 * var(--d)) calc(-0.707 * var(--d)) 0 5px,
		calc(0 * var(--d)) calc(-1 * var(--d)) 0 6px;
	animation: ${l27} 1s infinite steps(8);
`;
