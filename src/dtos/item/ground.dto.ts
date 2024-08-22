import { z } from 'zod';
import { ItemDto } from './item.dto';
import { AddressDto } from './general.dto';
import { SubscriptionDto } from './club.dto';

export const GroundDto = ItemDto.merge(
	z.object({
		address: AddressDto,
		minReservationTime: z
			.number()
			.min(1, 'Minimum reservation time must be greater than 0'),
		price: z.number().min(1, 'Price must be greater than 0'),
		busyHours: z.array(
			z.object({
				date: z.date(),
				hours: z.array(z.string()),
			})
		),
		subscriptions: z.array(SubscriptionDto).optional(),
	})
);

export type GroundDtoType = z.infer<typeof GroundDto>;
