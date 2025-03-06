import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Button, Form } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router';

import { IFormInput } from '@/types/form.type';
import { loginSchema } from '@/types/loginSchema';
import Input from '@/components/ui/Input';
import useLogIn from '@/hooks/useLogIn';
import Loading from '@/components/ui/Loading';

const LogIn = () => {
	const { login, isPending, error } = useLogIn();

	const { control, handleSubmit } = useForm<IFormInput>({
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onChange',
		resolver: zodResolver(loginSchema),
	});

	const onSubmit: SubmitHandler<IFormInput> = (data) => {
		console.log(data);
		login(data);
	};

	return (
		<>
			{error && (
				<Alert
					variant='danger'
					className='mb-3'>
					<h4 className='alert-heading'>Warning!</h4>
					<strong>{error}</strong> and try submitting again.
				</Alert>
			)}
			<Form
				onSubmit={handleSubmit(onSubmit)}
				className='px-4'>
				<Input
					control={control}
					label='Email'
					name='email'
					type='email'
					placeholder='Enter email'
				/>
				<Input
					control={control}
					label='Password'
					name='password'
					type='password'
					placeholder='Enter password'
				/>

				<Button
					className='my-4 d-block mx-auto w-50 fs-6'
					size='sm'
					type='submit'
					variant='outline-primary'
					disabled={isPending}>
					{isPending ? <Loading /> : 'Sign In'}
				</Button>

				<p className='text-center'>
					Don't have an account yet?{' '}
					<Link
						to={'/sign-up'}
						className='fst-italic text-body-secondary'>
						Sign Up
					</Link>
				</p>

				<p className='mt-5 mb-3 text-body-secondary'>
					&copy; 2022 - {new Date().getFullYear()} | Made by{' '}
					<Link
						className='fw-bold text-decoration-none'
						to={'github.com/zin-it-dev'}
						target='_blank'>
						ZIN
					</Link>
				</p>
			</Form>
		</>
	);
};

export default LogIn;
