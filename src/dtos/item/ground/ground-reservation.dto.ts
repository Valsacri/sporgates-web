import { z } from 'zod';
import { TimeframeDto } from '../general.dto';
import { GroundRerservationStatus } from '@/types/item/ground/ground-reservation.types';

export const GroundReservationStatusDto = z.nativeEnum(
	GroundRerservationStatus
);

export const GroundReservationDto = z.object({
	business: z.string().min(1),
	ground: z.string().min(1),
	user: z.string().min(1),
	date: z.number(),
	timeframe: TimeframeDto,
	groundPrice: z.number().min(1),
	groundMinReservationTime: z.number().min(1),
	status: GroundReservationStatusDto,
});
export type GroundReservationDtoType = z.infer<typeof GroundReservationDto>;

export const GroundReservationUpdateDto = GroundReservationDto.partial();
export type GroundReservationUpdateDtoType = z.infer<
	typeof GroundReservationUpdateDto
>;

