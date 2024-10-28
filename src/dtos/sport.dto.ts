import { z } from 'zod';

export const CreateSportDto = z.object({
	name: z.string().min(1),
	imageUrl: z.string().min(1),
});
export type CreateSportDtoType = z.infer<typeof CreateSportDto>;

export const SportUpdateDto = CreateSportDto.partial();
export type SportUpdateDtoType = z.infer<typeof SportUpdateDto>;
