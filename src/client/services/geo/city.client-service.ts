import { Axios } from '@/client/config/axios';
import { City } from '@/types/geo.types';

export class CityClientService {
	static async getPage() {
		const res = await Axios.get<City[]>('/geo/cities');
		return res.data;
	}
}
