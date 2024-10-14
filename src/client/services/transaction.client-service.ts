import { Transaction } from '@/types/wallet.types';
import { Axios } from '../config/axios';

export class TransactionClientService {
	static async getPage() {
		const res = await Axios.get<Transaction[]>('/wallet/transactions');
		return res.data;
	}
}
