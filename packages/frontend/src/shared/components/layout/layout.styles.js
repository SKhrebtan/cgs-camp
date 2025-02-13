import { css } from '@emotion/css';

export const headerStyles = (theme) => css`
	width: 100%;
	padding: 10px;
	background-color: ${theme.colors.headerBackground};
`;
export const navStyles = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const settingsStyles = css`
	display: flex;
	gap: 20px;
	align-items: center;
`;

export const listStyles = css`
	display: flex;
	gap: 20px;
	padding-left: 20px;
	align-items: center;
`;

export const linkStyles = css`
	color: white;
	&:hover {
		color: blue;
		text-decoration: none;
	}

	&.active {
		color: orange;
	}
`;

export const mainStyles = css`
	padding: 20px;
	display: flex;
	position: relative;
`;
