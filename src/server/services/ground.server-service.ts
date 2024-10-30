import { FilterQuery } from 'mongoose';
import { GroundModel } from '../models/item/ground.model';
import { GroundDtoType, GroundUpdateDtoType } from '@/dtos/item/ground.dto';
import { Ground } from '@/types/item/ground.types';
import {
	formatDocument,
	getGeoLocationQuery,
	valueOrEmptyObject,
} from '../helpers/database.helper';

export class GroundServerService {
	static async getOne(id: string) {
		const ground = await GroundModel.findById(id)
			.populate('address.city')
			.populate('address.town');
		if (!ground) return null;
		return formatDocument<Ground>(ground);
	}

	static async getAll(filters: {
		keywords?: string;
		business?: string;
		city?: string;
		town?: string;
		lat?: number;
		lng?: number;
		radius?: number;
	}) {
		const grounds = await GroundModel.find({
			...valueOrEmptyObject(filters.keywords, {
				name: { $regex: filters.keywords, $options: 'i' },
			}),
			...valueOrEmptyObject(filters.business, { business: filters.business }),
			...valueOrEmptyObject(filters.city, { 'address.city': filters.city }),
			...valueOrEmptyObject(filters.town, { 'address.town': filters.town }),
			...valueOrEmptyObject(filters.lat && filters.lng && filters.radius, {
				'address.geoLocation': getGeoLocationQuery(filters),
			}),
		})
			.collation({ locale: 'en', strength: 1 })
			.populate('address.city')
			.populate('address.town');

		return formatDocument<Ground[]>(grounds);
	}

	static async getPage(page = 1, limit = 10, query: FilterQuery<Ground> = {}) {
		const grounds = await GroundModel.find(query, null, {
			limit,
			skip: (page - 1) * limit,
		})
			.populate('address.city')
			.populate('address.town');

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
