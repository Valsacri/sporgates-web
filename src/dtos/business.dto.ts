import { z } from 'zod';

// create business
export const CreateBusinessDto = z.object({
	name: z.string().min(1),
	bio: z.string().min(1),
	username: z.string().min(1),
});
export type CreateBusinessDtoType = z.infer<typeof CreateBusinessDto>;

// update business
export const UpdateBusinessDto = z.object({
	name: z.string().optional(),
	bio: z.string().optional(),
});
export type UpdateBusinessDtoType = z.infer<typeof UpdateBusinessDto>;

// update profile
export const UpdateBusinessProfileDto = z.object({
	name: z.string().optional(),
	username: z.string().optional(),
});
export type UpdateBusinessProfileDtoType = z.infer<
	typeof UpdateBusinessProfileDto
>;
