import { formatDocument } from '@/server/helpers/database.helper';
import { TownModel } from '@/server/models/geo/town.model';
import { Town } from '@/types/geo.types';
import { FilterQuery } from 'mongoose';

export class TownServerService {
	static async getPage(
		cityId: string,
		page = 1,
		limit = 10,
		query: FilterQuery<Town> = {}
	) {
		const towns = await TownModel.find({ city: cityId, ...query }, null, {
			limit,
			skip: (page - 1) * limit,
		});
		return formatDocument<Town[]>(towns);
	}
}
