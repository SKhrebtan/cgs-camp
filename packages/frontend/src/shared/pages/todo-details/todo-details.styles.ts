import { css } from '@emotion/css';
import { THEME_CSS } from '~/common/constants/styles';

export const wrapperStyles = css`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 20px;
	padding: 40px;
`;

export const btnWrapperStyles = css`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 60px;
`;

export const titleStyles = css`
	font-size: ${THEME_CSS.text.fontH2};
`;

export const descriptionBlockStyles = css`
	display: flex;
	flex-direction: column;
	gap: 5px;
`;

export const descriptionTitleStyles = css`
	font-size: ${THEME_CSS.text.fontTitle};
`;

export const descriptionTextStyles = css`
	font-size: ${THEME_CSS.text.fontText};
`;

export const statusBlockStyles = css`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const statusTextStyles = css`
	margin: 0;
	font-size: ${THEME_CSS.text.fontH2};
`;
