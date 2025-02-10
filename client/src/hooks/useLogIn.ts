import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { AxiosError } from 'axios';

import { IFormInput } from '@/types/form.type';
import { loginUser } from '@/services/auth';
import { useAuthStore } from './useAuthStore';

const useLogIn = () => {
	const navigate = useNavigate();
	const setUser = useAuthStore((state) => state.setUser);

	const mutation = useMutation({
		mutationFn: (credentials: IFormInput) => loginUser(credentials),
		onSuccess: (data) => {
			setUser(data?.user);
			navigate('/');
		},
		onError: (error) => {
			console.error('Sign in error:', error);
		},
	});

	const error = mutation.error
		? (mutation.error as AxiosError<{ message: string }>)?.response?.data?.message ||
		  'Email or password is incorrect'
		: null;

	return {
		login: mutation.mutate,
		isPending: mutation.isPending,
		error,
	};
};

export default useLogIn;
