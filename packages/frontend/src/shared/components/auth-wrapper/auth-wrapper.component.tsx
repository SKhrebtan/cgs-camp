import React, { ReactNode } from 'react';
import { wrapperStyles } from './auth-wrapper.styles';

interface AuthWrapperProps {
	children: ReactNode;
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({
	children,
}): JSX.Element => {
	return <div className={wrapperStyles}>{children}</div>;
};
