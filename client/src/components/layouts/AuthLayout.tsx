import { Col, Row } from 'react-bootstrap';
import { Outlet } from 'react-router';

type Layout = {
	title: string;
};

const AuthLayout = (props: Layout) => {
	return (
		<Row className='w-100'>
			<Col
				xs={12}
				sm={9}
				md={9}
				lg={9}
				className='mx-auto'>
				<div className='p-lg-2'>
					<h3 className='text-center'>{props.title}</h3>
					<p className='text-center fs-5 text-muted mb-3 text-uppercase fst-italic'>
						Please sign in
					</p>
					<Outlet />
				</div>
			</Col>
		</Row>
	);
};

export default AuthLayout;
