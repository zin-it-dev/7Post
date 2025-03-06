import { useQuery } from '@tanstack/react-query';
import { Button, Container, Figure, Form, Stack } from 'react-bootstrap';
import { Link, useParams } from 'react-router';

import { fetchComments, fetchPost } from '@/services/fetchers';
import { QUERY_KEYS } from '@/services/queryKeys';
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
					<h1>{data.title}</h1>
					<p className='fs-5 fw-bolder'>{data.subject}</p>
					<hr className='my-4' />

					<Figure>
						<Figure.Image
							className='container'
							src={data.image}
							alt={data.title}
						/>
						<Figure.Caption className='text-center fw-bold'>
							Photo by{' '}
							<Link to={''}>{data.user.username}</Link>
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
								className='mb-3'
								as='textarea'
								placeholder='What are your thoughts?'
								rows={3}
							/>
							<Button
								className='text-capitalize'
								type={'submit'}>
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
