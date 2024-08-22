import { z } from 'zod';

export const ItemDto = z.object({
	name: z.string().min(1, 'Name is required'),
	description: z.string().optional(),
	images: z.array(z.string()).optional(),
	openingHours: z
		.object({
			monday: z.object({
				start: z.string().optional(),
				end: z.string().optional(),
			}),
			tuesday: z.object({
				start: z.string().optional(),
				end: z.string().optional(),
			}),
			wednesday: z.object({
				start: z.string().optional(),
				end: z.string().optional(),
			}),
			thursday: z.object({
				start: z.string().optional(),
				end: z.string().optional(),
			}),
			friday: z.object({
				start: z.string().optional(),
				end: z.string().optional(),
			}),
			saturday: z.object({
				start: z.string().optional(),
				end: z.string().optional(),
			}),
			sunday: z.object({
				start: z.string().optional(),
				end: z.string().optional(),
			}),
		})
		.optional(),
});
