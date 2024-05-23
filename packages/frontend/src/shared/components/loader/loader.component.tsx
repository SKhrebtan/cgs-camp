import * as React from 'react';
import { wrapperStyles, loaderStyles } from './loader.styles';

export const Loader: React.FunctionComponent = () => {
	return (
		<div className={wrapperStyles}>
			<div className={loaderStyles}></div>
		</div>
	);
};
