import React from 'react';
import { FormAuth, AuthWrapper } from '~shared/components/';

const LoginPage: React.FC = () => {
	return (
		<AuthWrapper>
			<h2>Login</h2>
			<FormAuth />
		</AuthWrapper>
	);
};

export default LoginPage;
