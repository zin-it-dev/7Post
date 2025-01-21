import { PostContext } from '@/contexts/PostContext';
import usePosts from '@/hooks/usePosts';

import { ReactNode } from 'react';

const PostContextProvider = ({ children }: { children: ReactNode }) => {
	const data = usePosts();

	return <PostContext.Provider value={data}>{children}</PostContext.Provider>;
};

export default PostContextProvider;
