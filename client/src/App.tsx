import { Route, Routes } from 'react-router';
import LogIn from './pages/LogIn';
import Register from './pages/Register';
import RootLayout from '@/components/layouts/RootLayout';
import AuthLayout from '@/components/layouts/AuthLayout';
import { publicRoutes } from '@/routes/routes';

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
				<Route element={<AuthLayout title='Sign In' />}>
					<Route
						path='/sign-in'
						element={<LogIn />}
					/>
					<Route
						path='/sign-up'
						element={<Register />}
					/>
				</Route>
			</Route>
		</Routes>
	);
};

export default App;
