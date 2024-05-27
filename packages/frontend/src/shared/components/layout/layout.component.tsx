import React, { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
	headerStyles,
	listStyles,
	linkStyles,
	mainStyles,
	navStyles,
	settingsStyles,
} from './layout.styles';
import { useTheme } from '@emotion/react';
import { Loader } from '~shared/components/loader/loader.component.js';
import { useUserStore } from '~store/user.store';
export const Layout: React.FC = () => {
	const isLoggedIn = useUserStore((state) => state.token);
	const logout = useUserStore((state) => state.logout);

	const theme = useTheme();
	const handleLogout = (): Promise<void> => logout();
	return (
		<div>
			<header className={headerStyles(theme)}>
				<nav className={navStyles}>
					<ul className={listStyles}>
						<li>
							<NavLink className={linkStyles} to="/">
								Home
							</NavLink>
						</li>
						{isLoggedIn && (
							<li>
								<NavLink className={linkStyles} to="/todos">
									Todos
								</NavLink>
							</li>
						)}
						{!isLoggedIn && (
							<>
								<li>
									<NavLink className={linkStyles} to="/login">
										Login
									</NavLink>
								</li>
								<li>
									<NavLink
										className={linkStyles}
										to="/register"
									>
										Register
									</NavLink>
								</li>
							</>
						)}
					</ul>
					{isLoggedIn && (
						<div className={settingsStyles}>
							<NavLink className={linkStyles} to="/settings">
								Settings
							</NavLink>
							<button
								className="bp5-button bp5-intent-primary"
								type="button"
								onClick={handleLogout}
							>
								Logout
							</button>
						</div>
					)}
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
