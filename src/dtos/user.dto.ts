import { z } from 'zod';

// create user
export const CreateUserDto = z.object({
	firstName: z.string().min(2),
	lastName: z.string().min(2),
	username: z.string().min(2),
	email: z.string().email(),
});
export type CreateUserDtoType = z.infer<typeof CreateUserDto>;

// update profile
export const UpdateUserProfileDto = z.object({
	firstName: z.string().optional(),
	lastName: z.string().optional(),
	username: z.string().optional(),
});
export type UpdateUserProfileDtoType = z.infer<typeof UpdateUserProfileDto>;
