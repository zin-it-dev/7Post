import { Outlet } from 'react-router';

const AuthLayout = () => {
	return (
		<section className='container'>
			<Outlet />
		</section>
	);
};

export default AuthLayout;
