import * as React from 'react';
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '~/shared/components/layout/layout.component';
import { RestrictedRoute } from '~router/public.route';
import { PrivateRoute } from '~router/private.route';
import { useUserStore } from '~store/user.store';
import { useEffect } from 'react';
const TodosPage = lazy(() => import('~/shared/pages/todos.page'));
const LoginPage = lazy(() => import('~/shared/pages/login.page'));
const RegisterPage = lazy(() => import('~/shared/pages/register.page'));
const HomePage = lazy(() => import('~/shared/pages/home.page'));
const TodoDetailsPage = lazy(
	() => import('~shared/pages/todo-details/todo-details.page'),
);
const NotFoundPage = lazy(() => import('~/shared/pages/not-found.page'));
const SettingsPage = lazy(
	() => import('~/shared/pages/settings-page/settings.page'),
);
const ResetPasswordPage = lazy(
	() => import('~/shared/pages/reset-password.page'),
);

import { ROUTER_KEYS } from '~/common/constants/routers';

const App = (): React.ReactNode => {
	const { refresh } = useUserStore((state) => state);

	useEffect(() => {
		refresh();
	}, []);

	return (
		<Routes>
			<Route path={ROUTER_KEYS.HOME.ROOT} element={<Layout />}>
				<Route index element={<HomePage />} />
				<Route
					path={ROUTER_KEYS.REGISTER.ROOT}
					element={
						<RestrictedRoute
							redirectTo={ROUTER_KEYS.TODOS.ROOT}
							component={<RegisterPage />}
						/>
					}
				/>
				<Route
					path={ROUTER_KEYS.LOGIN.ROOT}
					element={
						<RestrictedRoute
							redirectTo={ROUTER_KEYS.TODOS.ROOT}
							component={<LoginPage />}
						/>
					}
				/>
				<Route
					path={ROUTER_KEYS.TODOS.ROOT}
					element={
						<PrivateRoute
							redirectTo={ROUTER_KEYS.LOGIN.ROOT}
							component={<TodosPage />}
						/>
					}
				/>
				<Route
					path={ROUTER_KEYS.TODOSDETAILS.ROOT}
					element={
						<PrivateRoute
							redirectTo={ROUTER_KEYS.LOGIN.ROOT}
							component={<TodoDetailsPage />}
						/>
					}
				/>
				<Route
					path={ROUTER_KEYS.SETTINGS.ROOT}
					element={
						<PrivateRoute
							redirectTo={ROUTER_KEYS.LOGIN.ROOT}
							component={<SettingsPage />}
						/>
					}
				/>
				<Route
					path={ROUTER_KEYS.RESETPASSWORD.ROOT}
					element={
						<PrivateRoute
							redirectTo={ROUTER_KEYS.LOGIN.ROOT}
							component={<ResetPasswordPage />}
						/>
					}
				/>

				<Route path="*" element={<NotFoundPage />} />
			</Route>
		</Routes>
	);
};

export default App;
