import { z } from 'zod';
import { AddressDto, SocialsDto } from './item/general.dto';

export const BusinessDto = z.object({
	name: z.string().min(1),
	description: z.string().min(1),
	slogan: z.string().min(1),
	logo: z.string().min(1),
	socials: SocialsDto,

	owner: z.string().min(1),
	staff: z.array(z.string()).optional(),

	email: z.string().min(1),
	phoneNumber: z.string().min(1),
	address: AddressDto,
});

export type BusinessDtoType = z.infer<typeof BusinessDto>;
export const BusinessUpdateDto = BusinessDto.partial();
export type BusinessUpdateDtoType = z.infer<typeof BusinessUpdateDto>;
