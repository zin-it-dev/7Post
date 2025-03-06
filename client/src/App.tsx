import { Route, Routes } from 'react-router';

import RootLayout from '@/components/layouts/RootLayout';
import AuthLayout from '@/components/layouts/AuthLayout';
import { authRoutes, publicRoutes } from '@/routes/routes';

const App = () => {
	return (
		<Routes>
			<Route element={<RootLayout />}>
				{publicRoutes.map((route, idx) => (
					<Route
						key={idx}
						path={route.path}
						element={<route.component />}
					/>
				))}
				{authRoutes.map((route, idx) => (
					<Route
						key={idx}
						element={<AuthLayout title={route.title} />}>
						<Route
							path={route.path}
							element={<route.component />}
						/>
					</Route>
				))}
			</Route>
		</Routes>
	);
};

export default App;
