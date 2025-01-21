import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink } from 'react-router';

import Search from './Search';

const Header = () => {
	return (
		<Navbar
			as='header'
			collapseOnSelect
			expand='lg'
			bg='light'
			className='mb-lg-5 mb-3 border-0'
			data-bs-theme='light'>
			<Container>
				<Link
					className='navbar-brand logo fw-bolder'
					to={'/'}>
					7Post
				</Link>
				<Navbar.Toggle aria-controls='responsive-navbar-nav' />
				<Navbar.Collapse id='responsive-navbar-nav'>
					<Search />
					<Nav className='fs-6 text-capitalize'>
						<NavLink
							className={'nav-link'}
							to={'/create'}
							title='Create a story'>
							Create a story
						</NavLink>
						<NavLink
							className={'nav-link'}
							to={'/sign-in'}
							title='Create a post'>
							Sign In
						</NavLink>
						<NavLink
							className={'nav-link'}
							to={'/sign-up'}
							title='Create a post'>
							Sign Up
						</NavLink>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;
