import { z } from 'zod';
import { TimeframeDto } from './general.dto';

export const ItemDto = z.object({
	name: z.string().min(1, 'Name is required'),
	description: z.string().optional(),
	images: z.array(z.string()),
	openingHours: z
		.object({
			monday: z.array(TimeframeDto),
			tuesday: z.array(TimeframeDto),
			wednesday: z.array(TimeframeDto),
			thursday: z.array(TimeframeDto),
			friday: z.array(TimeframeDto),
			saturday: z.array(TimeframeDto),
			sunday: z.array(TimeframeDto),
		})
		.optional(),
});

export type ItemDtoType = z.infer<typeof ItemDto>;
