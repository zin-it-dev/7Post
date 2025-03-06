import { Post } from '@/types/post.type';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router';

const Item = (post: Post) => {
	return (
		<Card className='mb-3 border-0'>
			<Card.Body>
				<Link
					to={`/stories/${post.id}`}
					className='fs-3 text-capitalize text-primary card-title h5'>
					{post.title}
				</Link>
				<Card.Text className='fs-5 mt-3'>{post.subject}</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default Item;
