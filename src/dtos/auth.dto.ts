import { z } from 'zod';
import { CreateUserDto } from './user.dto';

export const EmailDto = z.object({
	email: z.string().email(),
});

// sign up
export const SignUpDto = CreateUserDto.merge(
	z.object({
		password: z.string().min(6),
		confirmPassword: z.string().min(6),
	})
).refine((data) => data.password === data.confirmPassword, {
	message: 'Passwords do not match',
	path: ['confirmPassword'],
});
export type SignUpDtoType = z.infer<typeof SignUpDto>;

// sign in
export const SignInDto = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});
