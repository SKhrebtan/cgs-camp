import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserStore } from '~store/user.store';

export const PrivateRoute = ({
	component: Component,
	redirectTo = '/',
}): React.ReactNode => {
	const isLoggedIn = useUserStore((state) => state.token);
	return !isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};
