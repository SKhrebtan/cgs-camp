import { css } from '@emotion/css';
import { THEME_CSS } from '~/common/constants/styles';
import { colors } from '~shared/styles';
export const btnStyles = (disabled: boolean, isViewButton: boolean): string => {
	return css`
		width: 80px;
		padding: 8px 0;
		font-size: 18px;
		font-weight: 500;
		color: ${disabled ? colors.imperial : colors.white};
		background-color: ${disabled
			? THEME_CSS.colors.disabledColor
			: isViewButton
				? THEME_CSS.colors.viewButtonColor
				: THEME_CSS.colors.deleteColor};
		border: none;
		border-radius: 28px;
		box-shadow: 0px 1px 1px rgba(255, 255, 255, 0.06);
		text-align: center;
		transition: box-shadow 0.3s;
		&:hover {
			box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
		}
	`;
};

export const btnContentWrapper = css`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const iconWrapper = css`
	display: flex;
	align-items: center;
`;

export const mr = css`
	margin-right: 15px;
`;
