import { z } from 'zod';
import { ItemDto } from '../item.dto';

export const GroundDto = ItemDto.merge(
	z.object({
		address: z.string().min(1),
		minReservationTime: z.coerce
			.number()
			.min(1, 'Minimum reservation time must be greater than 0'),
		price: z.coerce.number().min(1, 'Price must be greater than 0'),
		// subscriptions: z.array(SubscriptionDto).optional(),
		sports: z.array(z.string().min(1)).optional(),
	})
);
export type GroundDtoType = z.infer<typeof GroundDto>;

export const GroundUpdateDto = GroundDto.partial();
export type GroundUpdateDtoType = z.infer<typeof GroundUpdateDto>;
