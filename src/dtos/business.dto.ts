import { z } from 'zod';
import { AddressDto, SocialsDto } from './item/general.dto';

// create business
export const BusinessDto = z.object({
	name: z.string().min(1),
	description: z.string().min(1),
	bio: z.string().min(1),
	avatar: z.string().min(1),
	cover: z.string().min(1),
	socials: SocialsDto,

	owner: z.string().min(1),
	staff: z.array(z.string()).optional(),

	email: z.string().min(1),
	phoneNumber: z.string().min(1),
	address: AddressDto,
});
export type BusinessDtoType = z.infer<typeof BusinessDto>;

// update business
export const BusinessUpdateDto = BusinessDto.partial();
export type BusinessUpdateDtoType = z.infer<typeof BusinessUpdateDto>;

// update profile
export const UpdateBusinessProfileDto = z.object({
	name: z.string().optional(),
	username: z.string().optional(),
});
export type UpdateBusinessProfileDtoType = z.infer<typeof UpdateBusinessProfileDto>;
