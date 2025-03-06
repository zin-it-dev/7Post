import { Card } from 'react-bootstrap';
import { Link } from 'react-router';

import { Comment as CommentType } from '@/types/comment.type';
import Avatar from './Avatar';

const Comment = (props: CommentType) => {
	return (
		<Card className='mb-3 border-top-0 border-start-0 border-end-0'>
			<Card.Body>
				<Card.Title>
					<Avatar
						size={30}
						{...props.user}
					/>
					<Link
						to={`@/${props.user.username}`}
						className='ms-2 fs-6 text-capitalize hover-link text-decoration-none'>
						{props.user.username}
					</Link>
				</Card.Title>
				<Card.Text className='fs-6 text-primary'>{props.content}</Card.Text>
				<Card.Text className='text-muted fs-7'>
					{props.date_created}
				</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default Comment;
