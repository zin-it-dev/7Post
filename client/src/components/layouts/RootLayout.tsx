import { Outlet } from 'react-router';
import { Col } from 'react-bootstrap';

import Header from '../ui/Header';

const RootLayout = () => {
	return (
		<Col
			lg={8}
			md={8}
			className='mx-auto px-4 pb-lg-5'>
			<Header />
			<main>
				<Outlet />
			</main>
		</Col>
	);
};

export default RootLayout;
