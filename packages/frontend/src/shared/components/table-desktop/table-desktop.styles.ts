import { THEME_CSS } from '~/common/constants/styles';
import { css } from '@emotion/css';
export const tableStyles = css`
	width: 100%;

	th,
	td {
		padding: 8px;
		border-bottom: 1px solid ${THEME_CSS.colors.tableMainColor};
		text-align: left;
	}

	th {
		background-color: ${THEME_CSS.colors.tableSecondColor};
	}

	tr:nth-child(even) {
		background-color: ${THEME_CSS.colors.tableSecondColor};
	}

	tr:hover {
		background-color: ${THEME_CSS.colors.tableMainColor};
	}
`;
export const actionTHStyles = css`
	width: 320px;
`;
export const actionColumnStyles = css`
	width: 320px;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 20px;
`;
