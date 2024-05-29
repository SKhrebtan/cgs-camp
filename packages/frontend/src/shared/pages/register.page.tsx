import React from 'react';
import { FormAuth, AuthWrapper } from '~shared/components/';
const RegisterPage: React.FC = () => {
	return (
		<AuthWrapper>
			<h2>Register</h2>
			<FormAuth register={true} />
		</AuthWrapper>
	);
};

export default RegisterPage;
