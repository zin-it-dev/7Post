import { Post } from '@/types/post.type';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { IoMdHeartEmpty } from 'react-icons/io';
import { BiRepost } from 'react-icons/bi';
import { Link } from 'react-router';
import TooltipLink from './TooltipLink';
import ProfileItem from './ProfileItem';
import { formatFullName } from '@/utils/formats';

const Item = (post: Post) => {
	return (
		<Link
			to={`/stories/${post.id}`}
			className='text-decoration-none'>
			<Card className='mb-3 border-0'>
				<Row className='g-0 d-flex'>
					<Col
						sm={3}
						md={5}>
						<Card.Img
							className='rounded-start img-fluid'
							src='https://miro.medium.com/v2/resize:fit:1100/format:webp/1*GMROkaMv-vXqxMFgxh0HkA.png'
							alt='Card image'
						/>
					</Col>
					<Col
						sm={9}
						md={7}
						className='d-flex flex-column justify-content-between'>
						<Card.Body>
							<Card.Title className='text-capitalize text-primary'>
								{post.title}
							</Card.Title>
							<Card.Subtitle className='mb-2 text-muted text-capitalize'>
								In{' '}
								<TooltipLink
									id='category-tooltip'
									title={`Topic: ${post.category.label}`}
									path={`/?category=${post.category.id}`}>
									{post.category.label}
								</TooltipLink>{' '}
								by{' '}
								<TooltipLink
									id='category-tooltip'
									title={
										<ProfileItem
											{...post.user}
										/>
									}
									path={`/@${post.user.username}`}>
									{formatFullName(
										post.user
											.first_name,
										post.user.last_name,
									)}
								</TooltipLink>{' '}
							</Card.Subtitle>
							<Card.Text className='fs-6 mt-4 fw-bold'>
								{post.subject}
							</Card.Text>
						</Card.Body>
						<Card.Footer className='border-0 d-flex justify-content-between align-items-center'>
							<Card.Text className='text-body-secondary fs-7 mb-0'>
								{post.date_created}
							</Card.Text>
							<div>
								<Button
									variant='link'
									className='text-decoration-none fs-6 fw-bold'>
									<IoMdHeartEmpty size={20} />{' '}
									9
								</Button>{' '}
								<Button
									variant='link'
									className='text-decoration-none fs-6 fw-bold'>
									<BiRepost size={20} /> 22
								</Button>
							</div>
						</Card.Footer>
					</Col>
				</Row>
			</Card>
		</Link>
	);
};

export default Item;
