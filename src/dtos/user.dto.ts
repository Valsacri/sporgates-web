import { z } from 'zod';

// create user
export const CreateUserDto = z.object({
	firstName: z.string().min(2),
	lastName: z.string().min(2),
	username: z.string().min(2),
	email: z.string().email(),
});
export type CreateUserDtoType = z.infer<typeof CreateUserDto>;

// update user
export const UserProfileDto = z.object({
	firstName: z.string().min(2).optional(),
	lastName: z.string().min(2).optional(),
	bio: z.string().optional(),
	sports: z.array(z.string()).optional(),
});
export type UserProfileDtoType = z.infer<typeof UserProfileDto>;

// username
export const UsernameDto = z.object({
	username: z.string().min(2),
});
export type UsernameDtoType = z.infer<typeof UsernameDto>;