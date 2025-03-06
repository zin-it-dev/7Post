import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, NavLink } from 'react-router';

import Search from './Search';
import { useAuthStore } from '@/hooks/useAuthStore';
import Avatar from './Avatar';

const Header = () => {
	const { user, isAuthenticated, logout } = useAuthStore();

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
					Dev7
				</Link>
				<Navbar.Toggle aria-controls='responsive-navbar-nav' />
				<Navbar.Collapse id='responsive-navbar-nav'>
					<Search />
					<Nav className='text-capitalize align-items-lg-center'>
						{isAuthenticated ? (
							<>
								<NavLink
									className={'nav-link'}
									to={'/create'}
									title='Create a story'>
									Create a story
								</NavLink>
								<NavDropdown
									title={
										<Avatar
											{...user!}
											size={32}
										/>
									}
									id='user-nav-dropdown'>
									<NavDropdown.Item
										as={Link}
										to='/profile'>
										Profile
									</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item
										onClick={logout}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							</>
						) : (
							<>
								<NavLink
									className={'nav-link'}
									to={'/sign-in'}
									title='Sign In'>
									Sign In
								</NavLink>
								<NavLink
									className={'nav-link'}
									to={'/sign-up'}
									title='Sign Up'>
									Sign Up
								</NavLink>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;
