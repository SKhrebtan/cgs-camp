import { css } from '@emotion/css';

export const wrapperStyles = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
	@media screen and (min-width: 768px) {
		flex-direction: row-reverse;
		justify-content: space-between;
	}
	@media screen and (min-width: 1280px) {
		width: 100%;
		padding-left: 40px;
		padding-right: 40px;
	}
`;

export const listStyles = css`
	display: flex;
	gap: 4px;

	@media screen and (min-width: 768px) {
		gap: 10px;
	}
	@media screen and (min-width: 1280px) {
		gap: 20px;
	}
`;
