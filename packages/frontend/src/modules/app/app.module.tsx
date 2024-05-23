import * as React from 'react';
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '~/shared/components/layout/layout.component';
const TodosPage = lazy(() => import('~/shared/pages/todos.page'));
const HomePage = lazy(() => import('~/shared/pages/home.page'));
const TodoDetailsPage = lazy(
	() => import('~shared/pages/todo-details/todo-details.page'),
);
const NotFoundPage = lazy(() => import('~/shared/pages/not-found.page'));
import { ROUTER_KEYS } from '~/common/constants/routers';

const App = (): React.ReactNode => {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<HomePage />} />
				<Route path={ROUTER_KEYS.TODOS.ROOT} element={<TodosPage />} />
				<Route
					path={ROUTER_KEYS.TODOSDETAILS.ROOT}
					element={<TodoDetailsPage />}
				/>
				<Route path="*" element={<NotFoundPage />} />
			</Route>
		</Routes>
	);
};

export default App;
