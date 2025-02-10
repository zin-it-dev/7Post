import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';

import { fetchPosts } from '@/services/fetchers';
import { QUERY_KEYS } from '@/services/queryKeys';

const usePosts = () => {
	const [searchParams] = useSearchParams();

	const keyword = searchParams.get('keyword') || '';
	const category = searchParams.get('category') || '';

	const { data } = useQuery({
		queryKey: [QUERY_KEYS[0], keyword, category],
		queryFn: () => fetchPosts(keyword, category),
	});

	return data;
};

export default usePosts;
