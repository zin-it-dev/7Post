import Detail from '@/pages/Detail';
import Home from '@/pages/Home';

type RouteType = {
	path: string;
	component: any;
};

export const publicRoutes: RouteType[] = [
	{
		path: '/',
		component: Home,
	},
	{
		path: '/stories/:id',
		component: Detail,
	},
];
