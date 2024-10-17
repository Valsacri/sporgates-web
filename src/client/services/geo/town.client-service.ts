import { Axios } from '@/client/config/axios';
import { Town } from '@/types/geo.types';

export class TownClientService {
	static async getPage(cityId: string) {
		const res = await Axios.get<Town[]>(`/geo/cities/${cityId}/towns`);
		return res.data;
	}
}
