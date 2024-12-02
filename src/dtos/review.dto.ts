import { ReviewTopicType } from '@/types/review.types';
import { z } from 'zod';

export const CreateReviewDto = z.object({
	rating: z.number().int().min(1).max(5),
	comment: z.string().optional(),
	topicType: z.nativeEnum(ReviewTopicType),
	topic: z.string().min(1),
});
export type CreateReviewDtoType = z.infer<typeof CreateReviewDto>;

export const UpdateReviewDto = CreateReviewDto.partial();
export type UpdateReviewDtoType = z.infer<typeof UpdateReviewDto>;
