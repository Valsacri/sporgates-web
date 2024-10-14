import { MIN_DEPOSIT_AMOUNT } from '@/constants';
import { z } from 'zod';

export const WalletDepositeDto = z.object({
	amount: z
		.number()
		.positive('Amount should be positive')
		.gte(MIN_DEPOSIT_AMOUNT),
});
export type WalletDepositeDtoType = z.infer<typeof WalletDepositeDto>;
