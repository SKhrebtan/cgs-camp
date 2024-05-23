import React, { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
	headerStyles,
	listStyles,
	linkStyles,
	mainStyles,
} from './layout.styles';
import { useTheme } from '@emotion/react';
import { Loader } from '~shared/components/loader/loader.component.js';

export const Layout: React.FC = () => {
	const theme = useTheme();
	return (
		<div>
			<header className={headerStyles(theme)}>
				<nav>
					<ul className={listStyles}>
						<li>
							<NavLink className={linkStyles} to="/">
								Home
							</NavLink>
						</li>
						<li>
							<NavLink className={linkStyles} to="/todos">
								Todos
							</NavLink>
						</li>
					</ul>
				</nav>
			</header>

			<main className={mainStyles}>
				<Suspense fallback={<Loader />}>
					<Outlet />
				</Suspense>
			</main>
			<footer></footer>
		</div>
	);
};
