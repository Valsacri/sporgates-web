import { z } from 'zod';
import { ItemDto } from './item.dto';
import { AddressDto, DateTimeframesDto, TimeframeDto } from './general.dto';
import { SubscriptionDto } from './club.dto';
import { GroundRerservationStatus } from '@/types/item/ground.types';

export const GroundReservationStatusDto = z.nativeEnum(
	GroundRerservationStatus
);

export const GroundReservationDto = z.object({
	ground: z.string().min(1),
	user: z.string().min(1),
	date: z.number(),
	timeframe: TimeframeDto,
	totalPrice: z.number(),
	status: GroundReservationStatusDto,
});
export type GroundReservationDtoType = z.infer<typeof GroundReservationDto>;

export const GroundReservationUpdateDto = GroundReservationDto.partial();
export type GroundReservationUpdateDtoType = z.infer<
	typeof GroundReservationUpdateDto
>;

export const GroundDto = ItemDto.merge(
	z.object({
		address: AddressDto,
		minReservationTime: z.coerce
			.number()
			.min(1, 'Minimum reservation time must be greater than 0'),
		price: z.coerce.number().min(1, 'Price must be greater than 0'),
		busyHours: z.array(DateTimeframesDto),
		subscriptions: z.array(SubscriptionDto).optional(),
	})
);
export type GroundDtoType = z.infer<typeof GroundDto>;

export const GroundUpdateDto = GroundDto.partial();
export type GroundUpdateDtoType = z.infer<typeof GroundUpdateDto>;
