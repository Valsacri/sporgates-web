import { Axios } from '../config/axios';

export class WalletClientService {
	static async getBalance() {
		const res = await Axios.get<number>('/wallet');
		return res.data;
	}

	static async deposit(amount: number) {
		const res = await Axios.post<number>('/wallet', { amount });
		return res.data;
	}
}
