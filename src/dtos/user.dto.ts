import { z } from 'zod';

export const CreateUserDto = z.object({
	uid: z.string().min(1),
	firstName: z.string().min(2),
	lastName: z.string().min(2),
	email: z.string().email(),
});
export type CreateUserDtoType = z.infer<typeof CreateUserDto>;

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

export const SignInDto = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});
