import { z } from 'zod';

export const AddressDto = z.object({
	country: z.string(),
	city: z.string().min(1, 'This field is required'),
	neighborhood: z.string().min(1, 'This field is required'),
	street: z.string(),
	zip: z.string(),
	geoLocation: z.object({
		lat: z.coerce.number(),
		lng: z.coerce.number(),
	}),
	isHighlighted: z.boolean().optional(),
});

export const ReviewDto = z.object({
	rating: z.coerce.number(),
	comment: z.string(),
	user: z.string(),
});

export const SocialsDto = z.object({
	instagram: z.string().nullable(),
	facebook: z.string().nullable(),
	x: z.string().nullable(),
	linkedin: z.string().nullable(),
	tiktok: z.string().nullable(),
});

export const TimeframeDto = z.object({
	from: z.object({
		hours: z.coerce.number(),
		minutes: z.coerce.number(),
	}),
	to: z.object({
		hours: z.coerce.number(),
		minutes: z.coerce.number(),
	}),
});

export const DateTimeframesDto = z.object({
	date: z.date(),
	hours: z.array(TimeframeDto),
});
