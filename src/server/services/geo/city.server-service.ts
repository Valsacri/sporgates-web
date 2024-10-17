import { formatDocument } from '@/server/helpers/database.helper';
import { CityModel } from '@/server/models/geo/city.model';
import { City } from '@/types/geo.types';
import { FilterQuery } from 'mongoose';

export class CityServerService {
	static async getPage(page = 1, limit = 10, query: FilterQuery<City> = {}) {
		const cities = await CityModel.find(query, null, {
			limit,
			skip: (page - 1) * limit,
		});
		return formatDocument<City[]>(cities);
	}
}
