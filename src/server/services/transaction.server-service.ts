import { formatDocument } from '../helpers/database.helper';
import { Transaction } from '@/types/wallet.types';
import { TransactionModel } from '../models/wallet/transaction.model';
import { TransactionDtoType } from '@/dtos/wallet/transaction.dto';
import { WalletModel } from '../models/wallet/wallet.model';

export class TransactionServerService {
	static async getOne(id: string) {
		const transaction = await TransactionModel.findById(id).populate('ground');
		if (!transaction) return null;
		return formatDocument<Transaction>(transaction);
	}

	static async getPage(userId: string, page = 1, limit = 10) {
		const wallet = await WalletModel.findOne({
			user: userId,
		});

		const transactions = await TransactionModel.find(
			{
				$or: [
					{
						sender: wallet?.id,
					},
					{
						receiver: wallet?.id,
					},
				],
			},
			null,
			{
				limit,
				skip: (page - 1) * limit,
			}
		)
			.populate('sender')
			.populate('receiver')
			.populate('groundReservation')
			.populate('clubSubscription');
		return formatDocument<Transaction[]>(transactions);
	}

	static async create(data: TransactionDtoType) {
		const transaction = await TransactionModel.create(data);
		if (!transaction) return null;
		return formatDocument<Transaction>(transaction);
	}

	static async delete(id: string) {
		const transaction = await TransactionModel.findByIdAndDelete(id);
		if (!transaction) return null;
		return formatDocument<Transaction>(transaction);
	}
}
