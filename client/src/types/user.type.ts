import { Base, FullName } from './base.type';

export type UserInfo = Base &
	FullName & {
		username: string;
		email: string;
		avatar: string;
	};