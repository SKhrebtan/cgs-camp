import React from 'react';
import { FormResetPassword } from '~shared/components';
import { useSearchParams } from 'react-router-dom';
const ResetPasswordPage: React.FC = () => {
	const [searchParams] = useSearchParams();
	const token = searchParams.get('token');

	console.log(token);
	return (
		<div>
			<div>Reset Password</div>
			<FormResetPassword token={token} />
		</div>
	);
};

export default ResetPasswordPage;
