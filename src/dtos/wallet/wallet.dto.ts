import { z } from 'zod';

export const WalletDepositeDto = z.object({
	wallet: z.string().min(1, 'Wallet is required'),
	amount: z.string().min(1, 'Amount is required'),
});
export type WalletDepositeType = z.infer<typeof WalletDepositeDto>;
