import Item from '@/components/ui/Item';
import { PostContext } from '@/contexts/PostContext';
import { useContext } from 'react';

const Home = () => {
	const posts = useContext(PostContext);

	if (!posts) {
		return <div>Loading...</div>;
	}

	return (
		<>
			{posts.results && posts.results.length > 0 ? (
				posts.results.map((post) => (
					<Item
						key={post.id}
						{...post}
					/>
				))
			) : (
				<p className='text-center fw-bold'>No posts available</p>
			)}
		</>
	);
};

export default Home;
