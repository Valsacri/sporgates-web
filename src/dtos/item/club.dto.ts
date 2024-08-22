import { z } from 'zod';
import { ItemDto } from './item.dto';
import { SubscriptionPeriodDuration } from '@/types/item/club.types';

export const SubscriptionDiscountDto = z.object({
	amount: z.number().min(1),
	endDate: z.string(),
});

export const SubscriptionPeriodDto = z.object({
	duration: z.nativeEnum(SubscriptionPeriodDuration),
	amount: z.number().min(1),
});

export const SubscriptionFeatureDto = z.object({
	description: z.string().min(1),
});

export const SubscriptionDto = z.object({
	name: z.string().min(1),
	description: z.string(),
	features: z.array(SubscriptionFeatureDto),
	price: z.number().min(1),
	period: SubscriptionPeriodDto,
	discount: SubscriptionDiscountDto,
	isDefault: z.boolean(),
});

export const ClubDto = ItemDto.merge(
	z.object({
		subscriptions: z.array(SubscriptionDto),
	})
);

export type ClubDtoType = z.infer<typeof ClubDto>;
