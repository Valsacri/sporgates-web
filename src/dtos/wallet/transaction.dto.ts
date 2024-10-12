import { z } from 'zod';
import {
	TransactionStatus,
	TransactionSubject,
	TransactionType,
} from '@/types/wallet.types';

export const TransactionStatusDto = z.nativeEnum(TransactionStatus);
export const TransactionTypeDto = z.nativeEnum(TransactionType);
export const TransactionSubjectDto = z.nativeEnum(TransactionSubject);

export const TransactionDto = z.object({
	ref: z.string().min(1, 'Reference is required'),
	amount: z.number().min(0, 'Amount must be greater than or equal to 0'),
	type: TransactionTypeDto,
	subject: TransactionSubjectDto,
	status: TransactionStatusDto.optional(),
	sender: z.string().min(1, 'Sender is required'),
	receiver: z.string().nullable(),
});
export type TransactionDtoType = z.infer<typeof TransactionDto>;
