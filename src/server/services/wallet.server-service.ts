import { TransactionSubject } from '@/types/wallet.types';
import { WalletModel } from '../models/wallet/wallet.model';
import { TransactionServerService } from './transaction.server-service';
import mongoose from 'mongoose';

export class WalletServerService {
	static async getBalance(userId: string) {
		const wallet = await WalletModel.findOne({ user: userId });
		if (!wallet) return null;
		return wallet.balance;
	}

	static async deposit(amount: number, userId: string) {
		const _wallet = await WalletModel.findOne({
			user: new mongoose.Types.ObjectId(userId),
		});

		if (!_wallet) {
			throw new Error('Cannot find wallet');
		}

		await TransactionServerService.create({
			amount,
			sender: _wallet.id,
			subject: TransactionSubject.DEPOSIT,
		});
		const wallet = await WalletModel.findByIdAndUpdate(
			_wallet,
			{
				$inc: {
					balance: amount,
				},
			},
			{ new: true }
		);
		if (!wallet) return null;
		return wallet.balance;
	}
}
