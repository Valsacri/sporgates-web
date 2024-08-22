import { z } from 'zod';

export const AddressDto = z.object({
	country: z.string(),
	city: z.string(),
	neighborhood: z.string(),
	street: z.string(),
	zip: z.string(),
	geoLocation: z.object({
		lat: z.number(),
		lng: z.number(),
	}),
	isDefault: z.boolean().optional(),
});

export const ReviewDto = z.object({
	rating: z.number(),
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
		hours: z.number(),
		minutes: z.number(),
	}),
	to: z.object({
		hours: z.number(),
		minutes: z.number(),
	}),
});

export const DateTimeframesDto = z.object({
	date: z.date(),
	hours: z.array(TimeframeDto),
});
