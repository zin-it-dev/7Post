export const ENDPOINTS = {
	token: import.meta.env.VITE_API_TOKEN_URL,
	me: import.meta.env.VITE_API_USERS_URL,
	posts: (keyword?: string, category?: string) => {
		let url = `${import.meta.env.VITE_API_POSTS_URL}?`;

		if (keyword) url += `keyword=${keyword}&`;
		if (category) url += `category=${category}`;

		return url.endsWith('&') ? url.slice(0, -1) : url;
	},
	post: (id: string | undefined) => `${import.meta.env.VITE_API_POSTS_URL}${id}`,
	comments: (id: string | undefined) =>
		`${import.meta.env.VITE_API_POSTS_URL}${id}${
			import.meta.env.VITE_API_COMMENTS_URL
		}`,
};
