import Input from '@/components/ui/Input';
import { Button, Form } from 'react-bootstrap';

const LogIn = () => {
	return (
		<Form>
			<h1 className='h2 text-capitalize text-center mb-5'>Welcome Back</h1>

			<Input
				name='email'
				type='email'
				placeholder='Email'
			/>

			<Input
				name='password'
				type='password'
				placeholder='Password'
			/>

			<Button
				type={'submit'}
				className='d-block mx-auto mt-4 rounded-5'>
				Sign In
			</Button>
		</Form>
	);
};

export default LogIn;
