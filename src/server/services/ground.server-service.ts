import { FilterQuery } from 'mongoose';
import { GroundModel } from '../models/item/ground.model';
import {
	GroundDtoType,
	GroundUpdateDtoType,
} from '@/dtos/item/ground/ground.dto';
import { Ground } from '@/types/item/ground/ground.types';
import {
	formatDocument,
	getGeoLocationQuery
} from '../helpers/database.helper';

export class GroundServerService {
	static async getOne(id: string) {
		const ground = await GroundModel.findById(id)
			.populate('address.city')
			.populate('address.town');
		if (!ground) return null;
		return formatDocument<Ground>(ground);
	}

	static async getPage(
		filters: {
			keywords?: string;
			sport?: string;
			business?: string;
			city?: string;
			town?: string;
			lat?: number;
			lng?: number;
			radius?: number;
		},
		page = 1,
		limit = 10
	) {
		const query = {} as FilterQuery<Ground>;

		if (filters.keywords) {
			query.name = { $regex: filters.keywords, $options: 'i' };
		}
		if (filters.sport) {
			query.sports = filters.sport;
		}
		if (filters.business) {
			query.business = filters.business;
		}
		if (filters.city) {
			query['address.city'] = filters.city;
		}
		if (filters.town) {
			query['address.town'] = filters.town;
		}
		if (filters.lat && filters.lng && filters.radius) {
			query['address.geoLocation'] = getGeoLocationQuery(filters);
		}

		const grounds = await GroundModel.find(query)
			.collation({ locale: 'en', strength: 1 })
			.limit(10)
			.skip((page - 1) * limit)
			.populate('address.city')
			.populate('address.town')
			.populate('sports');

		return formatDocument<Ground[]>(grounds);
	}

	static async create(data: GroundDtoType, createdBy?: string) {
		const ground = await GroundModel.create({ createdBy, ...data });

		return formatDocument<Ground>(ground);
	}

	static async update(
		id: string,
		data: GroundUpdateDtoType,
		updatedBy?: string
	) {
		const ground = await GroundModel.findByIdAndUpdate(
			id,
			{ updatedBy, ...data },
			{
				new: true,
			}
		);

		return formatDocument<Ground>(ground);
	}

	static async delete(id: string) {
		const ground = await GroundModel.findByIdAndDelete(id);

		return formatDocument<Ground>(ground);
	}
}
