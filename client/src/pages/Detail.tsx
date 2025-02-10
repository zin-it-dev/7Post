import Avatar from '@/components/ui/Avatar';
import TooltipLink from '@/components/ui/TooltipLink';
import { fetchComments, fetchPost } from '@/services/fetchers';
import { QUERY_KEYS } from '@/services/queryKeys';
import { formatFullName } from '@/utils/formats';
import { useQuery } from '@tanstack/react-query';
import { FaRegComment } from 'react-icons/fa';
import { Button, Card, Col, Container, Figure, Form, Stack } from 'react-bootstrap';
import { IoMdHeartEmpty } from 'react-icons/io';
import { Link } from 'react-router';
import { useParams } from 'react-router';
import ProfileItem from '@/components/ui/ProfileItem';
import Tag from '@/components/ui/Tag';
import Comment from '@/components/ui/Comment';

const Detail = () => {
	const { id } = useParams();

	const { data } = useQuery({
		queryKey: [QUERY_KEYS[1], id],
		queryFn: () => fetchPost(id),
	});

	const { data: comments } = useQuery({
		queryKey: [QUERY_KEYS[2], id],
		queryFn: () => fetchComments(id),
	});

	console.log(comments);

	return (
		<Container>
			{data ? (
				<>
					<h1 className='mb-3'>{data.title}</h1>
					<p className='fs-5 fw-bolder mb-3'>{data.subject}</p>
					<Col
						className='mb-4'
						md={9}
						lg={12}
						xl={12}>
						<Card className='border-0'>
							<Card.Body>
								<div className='d-flex'>
									<div className='flex-shrink-0'>
										<Link
											to={`/@${data.user.username}`}>
											<Avatar
												{...data.user}
												size={
													45
												}
											/>
										</Link>
									</div>
									<div className='flex-grow-1 ms-3'>
										<Card.Title className='fs-5 text-capitalize'>
											<span className='text-primary text-decoration-none hover-link'>
												{formatFullName(
													data
														.user
														.first_name,
													data
														.user
														.last_name,
												)}
											</span>
											<span
												className='ms-2 text-warning fs-6 text-capitalize'
												style={{
													cursor: 'pointer',
												}}>
												Follow
											</span>
										</Card.Title>
										<Card.Text>
											<p className='small fs-6 mb-0'>
												Published
												in{' '}
												<TooltipLink
													id='category-tooltip'
													title={`Topic: ${data.category.label}`}
													path={`/?category=${data.category.id}`}>
													<span className='fw-bold'>
														{
															data
																.category
																.label
														}
													</span>
												</TooltipLink>
											</p>
											<p className='small text-muted fs-6 mb-0'>
												{
													data.updated_created
												}{' '}
												{
													data.date_created
												}
											</p>
										</Card.Text>
									</div>
								</div>
							</Card.Body>
							<Card.Footer className='px-0'>
								<Button
									size={'sm'}
									variant='link'
									className='text-decoration-none fs-6 fw-bold'>
									<IoMdHeartEmpty size={20} />{' '}
									9
								</Button>{' '}
								<Button
									size={'sm'}
									variant='link'
									className='text-decoration-none fs-6 fw-bold'>
									<FaRegComment size={20} />{' '}
									22
								</Button>
							</Card.Footer>
						</Card>
					</Col>

					<Figure>
						<Figure.Image
							className='container'
							src={
								'https://miro.medium.com/v2/resize:fit:1100/format:webp/0*xEUFtzWZUJITm9Hw'
							}
							alt={data.title}
						/>
						<Figure.Caption className='text-center fs-6 mt-1 fw-bold'>
							Photo by{' '}
							<TooltipLink
								id='category-tooltip'
								title={
									<ProfileItem
										{...data.user}
									/>
								}
								path={`/@${data.user.username}`}>
								{formatFullName(
									data.user.first_name,
									data.user.last_name,
								)}
							</TooltipLink>
						</Figure.Caption>
					</Figure>

					<div className='mt-4 border-bottom pb-5'>
						<section className='mb-5 text-justify'>
							{data.content}
						</section>

						<Stack
							direction='horizontal'
							gap={2}>
							{data.tags?.map((tag, idx) => (
								<Tag
									label={tag}
									key={idx}
								/>
							))}
						</Stack>
					</div>

					<div className='mt-5'>
						<h5 className='text-capitalize mb-4'>
							{comments?.results
								? `Responses (${comments?.results.length})`
								: 'No responses yet'}
						</h5>

						<Form className='border-bottom pb-4'>
							<Form.Control
								className='mb-3 fs-6'
								as='textarea'
								placeholder='What are your thoughts?'
								rows={3}
							/>
							<Button
								className='text-capitalize fs-6'
								type={'submit'}
								size={'sm'}>
								Respond
							</Button>
						</Form>

						<section className='pt-5'>
							{comments?.results ? (
								comments?.results.map(
									(comment, idx) => (
										<Comment
											key={idx}
											{...comment}
										/>
									),
								)
							) : (
								<p>Not comments</p>
							)}
						</section>
					</div>
				</>
			) : (
				<p>No posts</p>
			)}
		</Container>
	);
};

export default Detail;
