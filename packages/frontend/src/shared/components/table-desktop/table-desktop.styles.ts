import { css } from '@emotion/css';

export const tableStyles = css`
	width: 100%;

	th,
	td {
		padding: 8px;
		border-bottom: 1px solid #ddd;
		text-align: left;
	}

	th {
		background-color: #f2f2f2;
	}

	tr:nth-child(even) {
		background-color: #f2f2f2;
	}

	tr:hover {
		background-color: #ddd;
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
