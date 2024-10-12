import { formatDocument } from '../helpers/database.helper';
import { Transaction } from '@/types/wallet.types';
import { TransactionModel } from '../models/wallet/transaction.model';
import { TransactionDtoType } from '@/dtos/wallet/transaction.dto';

export class TransactionServerService {
	static async getOne(id: string) {
		const transaction = await TransactionModel.findById(id).populate('ground');
		if (!transaction) return null;
		return formatDocument<Transaction>(transaction);
	}

	static async getPage(
		page: number,
		limit: number,
		query: Record<string, unknown>
	) {
		const users = await TransactionModel.find(query, null, {
			limit,
			skip: page * limit,
		}).populate('ground');
		return formatDocument<Transaction[]>(users);
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
