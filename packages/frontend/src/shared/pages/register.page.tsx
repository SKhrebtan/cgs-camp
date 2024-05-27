import React from 'react';
import { FormAuth } from '~shared/components/';
const RegisterPage: React.FC = () => {
	return (
		<div>
			<div>Register</div>
			<FormAuth register={true} />
		</div>
	);
};

export default RegisterPage;
