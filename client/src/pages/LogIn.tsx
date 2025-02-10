import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Button, Form } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router';

import { IFormInput } from '@/types/form.type';
import { loginSchema } from '@/types/loginSchema';
import Input from '@/components/ui/Input';
import useLogIn from '@/hooks/useLogIn';
import ActivityIndicator from '@/components/ui/ActivityIndicator';

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
					className='my-4 d-block mx-auto w-50'
					size='sm'
					type='submit'
					variant='outline-primary'
					disabled={isPending}>
					{isPending ? <ActivityIndicator /> : 'Sign In'}
				</Button>

				<p className='text-center fs-6'>
					Don't have an account yet?{' '}
					<Link
						to={'/sign-up'}
						className='fst-italic text-body-secondary'>
						Sign Up
					</Link>
				</p>

				<p className='fs-7 mt-5 mb-3 text-body-secondary'>
					&copy; 2017 - {new Date().getFullYear()}
				</p>
			</Form>
		</>
	);
};

export default LogIn;
