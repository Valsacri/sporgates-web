import { Wallet } from '@/types/wallet.types';
import { formatDocument } from '../helpers/database.helper';
import { WalletModel } from '../models/wallet/wallet.model';

export class WalletServerService {
	static async getBalance(id: string) {
		const wallet = await WalletModel.findById(id);
		if (!wallet) return null;
		return formatDocument<Wallet>(wallet);
	}

	static async deposit(id: string, amount: string) {
		const wallet = await WalletModel.findById(id);
		if (!wallet) return null;
		return formatDocument<Wallet>(wallet);
	}
}
