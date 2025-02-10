import { z } from 'zod';

export const loginSchema = z
	.object({
		email: z
			.string({
				required_error: 'Email is required',
				invalid_type_error: 'Email must be a string',
			})
			.email({ message: 'Please enter a valid email address' }),
		password: z
			.string({
				required_error: 'Password is required',
				invalid_type_error: 'Password must be a string',
			})
			.min(1, { message: 'Password must be 8 or more characters long' }),
	})
	.required();
