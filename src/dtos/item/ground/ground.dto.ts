import { z } from 'zod';
import { ItemDto } from '../item.dto';
import { AddressDto } from '../general.dto';
import { SubscriptionDto } from '../club.dto';

export const GroundDto = ItemDto.merge(
	z.object({
		address: AddressDto,
		minReservationTime: z.coerce
			.number()
			.min(1, 'Minimum reservation time must be greater than 0'),
		price: z.coerce.number().min(1, 'Price must be greater than 0'),
		subscriptions: z.array(SubscriptionDto).optional(),
		sports: z.array(z.string().min(1)).optional(),
	})
);
export type GroundDtoType = z.infer<typeof GroundDto>;

export const GroundUpdateDto = GroundDto.partial();
export type GroundUpdateDtoType = z.infer<typeof GroundUpdateDto>;
