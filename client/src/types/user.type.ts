import { Base } from './base.type';

export type UserInfo = Base & {
	username: string;
	email: string;
	avatar: string;
	bio?: string;
};
