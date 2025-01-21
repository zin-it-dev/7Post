import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/lux/bootstrap.min.css';

import '@/styles/index.css';
import App from '@/App';
import PostContextProvider from '@/providers/PostContextProvider';
import { queryClient } from '@/services/queryClient';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<BrowserRouter>
				<PostContextProvider>
					<App />
				</PostContextProvider>
			</BrowserRouter>
		</QueryClientProvider>
	</StrictMode>,
);
