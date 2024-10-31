import { Axios } from '@/client/config/axios';
import { Sport } from '@/types/sport.types';

export class SportClientService {
	static async getAll() {
		const res = await Axios.get<Sport[]>('/sports');
		return res.data;
	}
}
