import { z } from 'zod';
import { ItemDto } from './item.dto';
import { ClubSubscriptionPeriodDuration } from '@/types/item/club.types';

export const SubscriptionDiscountDto = z.object({
	amount: z.coerce.number(),
	endDate: z.string(),
});

export const SubscriptionPeriodDto = z.object({
	duration: z.nativeEnum(ClubSubscriptionPeriodDuration),
	amount: z.coerce.number().min(1),
});

export const SubscriptionFeatureDto = z.object({
	description: z.string().min(1),
});

export type SubscriptionFeatureDtoType = z.infer<typeof SubscriptionFeatureDto>;

export const SubscriptionDto = z.object({
	name: z.string().min(1),
	description: z.string(),
	features: z.array(SubscriptionFeatureDto),
	price: z.coerce.number().min(1),
	period: SubscriptionPeriodDto,
	discount: SubscriptionDiscountDto,
	isHighlighted: z.boolean(),
});

export type SubscriptionDtoType = z.infer<typeof SubscriptionDto>;

export const ClubDto = ItemDto.merge(
	z.object({
		subscriptions: z.array(SubscriptionDto),
	})
);

export type ClubDtoType = z.infer<typeof ClubDto>;
