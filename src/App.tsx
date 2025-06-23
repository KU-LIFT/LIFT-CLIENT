import GlobalStyle from './styles/GlobalStyle';
import Router from './routes/Router';
import { ThemeProvider } from '@emotion/react';
import { theme } from './styles/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<Router />
			</ThemeProvider>
		</QueryClientProvider>
	);
}
