import { NotificationSubject } from '@/types/notification.types';
import { z } from 'zod';

export const CreateNotificationDto = z.object({
	subject: z.nativeEnum(NotificationSubject),
	title: z.string().min(1),
	description: z.string().min(1),
	image: z.string().optional(),
	user: z.string().min(1),
	infos: z.array(z.string()),
});
export type CreateNotificationDtoType = z.infer<typeof CreateNotificationDto>;
