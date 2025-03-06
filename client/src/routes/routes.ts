import { lazy } from 'react';

type RouteType = {
	path: string;
	component: any;
};

type RouteAuth = RouteType & {
	title: string;
};

const Home = lazy(() => import('@/pages/Home'));
const Detail = lazy(() => import('@/pages/Detail'));
const LogIn = lazy(() => import('@/pages/LogIn'));
const Register = lazy(() => import('@/pages/Register'));
const Profile = lazy(() => import('@/pages/Profile'));

export const publicRoutes: RouteType[] = [
	{
		path: '/',
		component: Home,
	},
	{
		path: '/stories/:id',
		component: Detail,
	},
	{
		path: '/profile',
		component: Profile,
	},
];

export const authRoutes: RouteAuth[] = [
	{
		title: 'Sign In',
		path: '/sign-in',
		component: LogIn,
	},
	{
		title: 'Sign Up',
		path: '/sign-up',
		component: Register,
	},
];

export const privateRoutes: RouteType[] = [];
