import { Cookies } from 'react-cookie';

import { clientHttp } from './axios';
import { ENDPOINTS } from './endpoints';
import { UserInfo } from '@/types/user.type';

interface IFormInput {
	email: string;
	password: string;
}

const cookies = new Cookies();

export const loginUser = async (credentials: IFormInput) => {
	try {
		const response = await clientHttp.post(ENDPOINTS['token'], credentials, {
			withCredentials: true,
		});

		console.log(response);

		const currentUser = await clientHttp.get(ENDPOINTS['me'], {
			headers: {
				Authorization: `Bearer ${response.data.access_token}`,
			},
		});

		saveToken(response.data.access_token, currentUser.data);

		return {
			token: response.data.access_token,
			user: currentUser.data,
		};
	} catch (error) {
		console.error('Error login...', error);
	}
};

export const saveToken = (token: string, user: UserInfo) => {
	cookies.set('token', token, {
		path: '/',
		maxAge: 7 * 24 * 60 * 60,
		secure: true,
		sameSite: 'strict',
	});

	cookies.set('current_user', user, {
		path: '/',
		maxAge: 7 * 24 * 60 * 60,
		secure: true,
		sameSite: 'strict',
	});
};

export const removeToken = () => {
	cookies.remove('token', { path: '/', secure: true, sameSite: 'strict' });
	cookies.remove('current_user', { path: '/', secure: true, sameSite: 'strict' });
};

export const getToken = () => {
	return {
		token: cookies.get('token'),
		currentUser: cookies.get('current_user'),
	};
};
