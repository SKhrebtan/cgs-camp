import { useState, useEffect } from 'react';

interface MediaObserverState {
	isTabletScreen: boolean;
	isDesktopScreen: boolean;
}

export const useMediaObserver: () => MediaObserverState = () => {
	const [mediaState, setMediaState] = useState<MediaObserverState>({
		isTabletScreen: false,
		isDesktopScreen: false,
	});

	useEffect(() => {
		const tabletMediaQuery = '(min-width: 768px) and (max-width: 1279px)';
		const desktopMediaQuery = '(min-width: 1280px)';

		const tabletMediaWatcher = window.matchMedia(tabletMediaQuery);
		const desktopMediaWatcher = window.matchMedia(desktopMediaQuery);

		const updateMediaState = (): void => {
			setMediaState({
				isTabletScreen: tabletMediaWatcher.matches,
				isDesktopScreen: desktopMediaWatcher.matches,
			});
		};

		updateMediaState();

		tabletMediaWatcher.addEventListener('change', updateMediaState);
		desktopMediaWatcher.addEventListener('change', updateMediaState);

		return () => {
			tabletMediaWatcher.removeEventListener('change', updateMediaState);
			desktopMediaWatcher.removeEventListener('change', updateMediaState);
		};
	}, []);

	return mediaState;
};
