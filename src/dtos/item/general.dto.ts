import { z } from 'zod';

export const GeoLocationDto = z.object({
	lat: z.coerce.number(),
	lng: z.coerce.number(),
});

export const CreateAddressDto = z.object({
	label: z.string().optional(),
	city: z.string().min(1, 'This field is required'),
	town: z.string().min(1, 'This field is required'),
	street: z.string().optional(),
	zip: z.string().optional(),
	geoLocation: GeoLocationDto.required(),

	user: z.string().optional(),
	business: z.string().optional(),
});
export type CreateAddressDtoType = z.infer<typeof CreateAddressDto>;
export const UpdateAddressDto = CreateAddressDto.partial();
export type UpdateAddressDtoType = z.infer<typeof UpdateAddressDto>;

export const SocialsDto = z.object({
	instagram: z.string().nullable(),
	facebook: z.string().nullable(),
	x: z.string().nullable(),
	linkedin: z.string().nullable(),
	tiktok: z.string().nullable(),
});

export const TimeDto = z.object({
	hours: z.coerce.number(),
	minutes: z.coerce.number(),
});

export const TimeframeDto = z.object({
	start: TimeDto,
	end: TimeDto,
});

export const DateTimeframesDto = z.object({
	date: z.number(),
	timeframes: z.array(TimeframeDto),
});
