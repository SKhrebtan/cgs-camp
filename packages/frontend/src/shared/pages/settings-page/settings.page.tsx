import React from 'react';
import { authService } from '~shared/services/auth/auth-service';
import { useUserStore } from '~store/user.store';
import {
	settingsContainerStyles,
	messageStyles,
	emailStyles,
	errorStyles,
} from './settings.page.styles';
import { useState } from 'react';
const SettingsPage: React.FC = () => {
	const [message, setMessage] = useState<string | null>(null);
	const [errorState, setErrorState] = useState<string | null>(null);
	const email = useUserStore((state) => state.email);
	const handleForgotPassword = async (email): Promise<void> => {
		setErrorState(null);
		setMessage(null);
		try {
			const { message } = await authService.forgotPassword(email);
			setMessage(message);
		} catch (error) {
			setErrorState(error.message);
		}
	};
	return (
		<div className={settingsContainerStyles}>
			<p className={emailStyles}>Email: {email}</p>
			<button onClick={() => handleForgotPassword(email)} type="button">
				Reset password
			</button>
			{message && <p className={messageStyles}>{message}</p>}
			{errorState && <p className={errorStyles}>Error: {errorState}</p>}
		</div>
	);
};

export default SettingsPage;
