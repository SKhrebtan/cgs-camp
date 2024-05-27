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
import { ROUTER_KEYS } from '~/common/constants/routers';
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
							<NavLink
								className={linkStyles}
								to={ROUTER_KEYS.HOME.ROOT}
							>
								Home
							</NavLink>
						</li>
						{isLoggedIn && (
							<li>
								<NavLink
									className={linkStyles}
									to={ROUTER_KEYS.TODOS.ROOT}
								>
									Todos
								</NavLink>
							</li>
						)}
						{!isLoggedIn && (
							<>
								<li>
									<NavLink
										className={linkStyles}
										to={ROUTER_KEYS.LOGIN.ROOT}
									>
										Login
									</NavLink>
								</li>
								<li>
									<NavLink
										className={linkStyles}
										to={ROUTER_KEYS.REGISTER.ROOT}
									>
										Register
									</NavLink>
								</li>
							</>
						)}
					</ul>
					{isLoggedIn && (
						<div className={settingsStyles}>
							<NavLink
								className={linkStyles}
								to={ROUTER_KEYS.SETTINGS.ROOT}
							>
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
