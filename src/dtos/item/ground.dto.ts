import { z } from 'zod';
import { ItemDto } from './item.dto';
import { AddressDto, DateTimeframesDto } from './general.dto';
import { SubscriptionDto } from './club.dto';

export const GroundDto = ItemDto.merge(
	z.object({
		address: AddressDto,
		minReservationTime: z.coerce
			.number()
			.min(1, 'Minimum reservation time must be greater than 0'),
		price: z.coerce.number().min(1, 'Price must be greater than 0'),
		// minReservationTime: z.preprocess(
		// 	(val) => Number(val),
		// 	z.coerce.number().min(1, 'Minimum reservation time must be at least 1 minute')
		// ),
		// price: z.preprocess(
		// 	(val) => Number(val),
		// 	z.coerce.number().min(0, 'Price must be at least 0')
		// ),
		busyHours: z.array(DateTimeframesDto),
		subscriptions: z.array(SubscriptionDto).optional(),
	})
);

export type GroundDtoType = z.infer<typeof GroundDto>;

export const GroundUpdateDto = GroundDto.partial();

export type GroundUpdateDtoType = z.infer<typeof GroundUpdateDto>;
