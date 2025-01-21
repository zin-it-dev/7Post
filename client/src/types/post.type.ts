import { Base } from './base.type';
import { Category } from './category.type';
import { UserInfo } from './user.type';

export type Post = Base & {
	title: string;
	subject: string;
	content: string;
	category: Category;
	user: UserInfo;
	tags?: string[];
};

export type Posts = {
	results: Pick<
		Post,
		| 'id'
		| 'title'
		| 'subject'
		| 'content'
		| 'category'
		| 'user'
		| 'date_created'
		| 'updated_created'
	>[];
};
