import { Base } from './base.type';
import { UserInfo } from './user.type';

export type Comment = Base & {
	content: string;
	user: UserInfo;
};

export type Comments = {
	results: Pick<Comment, 'id' | 'content' | 'user' | 'date_created' | 'updated_created'>[];
};
