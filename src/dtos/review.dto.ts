import { z } from 'zod';

export const ReviewDto = z.object({
	rating: z.number().int().min(1).max(5),
	comment: z.string().optional(),
	user: z.string().optional(),
	ground: z.string().optional(),
	club: z.string().optional(),
});
export type ReviewDtoType = z.infer<typeof ReviewDto>;

export const CreateReviewDto = ReviewDto.refine(
	(data) => data.user || data.ground || data.club, // Ensure at least one is present
	{
		message: "At least one of 'user', 'ground', or 'club' must be provided",
		path: ['user', 'ground', 'club'], // Points to the relevant fields in the error
	}
);
export type CreateReviewDtoType = z.infer<typeof CreateReviewDto>;

export const UpdateReviewDto = ReviewDto.partial();
export type UpdateReviewDtoType = z.infer<typeof UpdateReviewDto>;
