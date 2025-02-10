import { clientHttp } from './axios';
import { ENDPOINTS } from './endpoints';
import { Comments } from '@/types/comment.type';
import { Post, Posts } from '@/types/post.type';

export const fetchPosts = async (
	keyword?: string,
	category?: string,
): Promise<Posts | undefined> => {
	try {
		const response = await clientHttp.get(ENDPOINTS['posts'](keyword, category));
		return response.data;
	} catch (error) {
		console.error('Error fetching posts', error);
	}
};

export const fetchPost = async (id: string | undefined): Promise<Post | undefined> => {
	try {
		const response = await clientHttp.get(ENDPOINTS['post'](id));
		return response.data;
	} catch (error) {
		console.error('Error fetching posts', error);
	}
};

export const fetchComments = async (id: string | undefined): Promise<Comments | undefined> => {
	try {
		const response = await clientHttp.get(ENDPOINTS['comments'](id));
		return response.data;
	} catch (error) {
		console.error('Error fetching posts', error);
	}
};