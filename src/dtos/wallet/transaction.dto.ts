import { z } from 'zod';
import { TransactionSubject } from '@/types/wallet.types';

export const TransactionSubjectDto = z.nativeEnum(TransactionSubject);

export const TransactionDto = z.object({
	ref: z.string().min(1, 'Reference is required'),
	amount: z.number().min(0, 'Amount must be greater than or equal to 0'),
	subject: TransactionSubjectDto,
	sender: z.string().optional(),
	receiver: z.string().optional(),
	refundGroundReservation: z.string().optional(),
	refundClubSubscription: z.string().optional(),
});
export type TransactionDtoType = z.infer<typeof TransactionDto>;
