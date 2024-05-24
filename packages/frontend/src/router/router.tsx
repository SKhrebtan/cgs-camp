import * as React from 'react';
import App from '~modules/app/app.module';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { theme } from '~shared/styles/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: { retry: 5, retryDelay: 1000 },
	},
});

const Router: React.FunctionComponent = () => {
	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<QueryClientProvider client={queryClient}>
					<App />
				</QueryClientProvider>
			</ThemeProvider>
		</BrowserRouter>
	);
};

export default Router;
