import mongoose, { FilterQuery } from 'mongoose';
import { GroundModel } from '../models/item/ground.model';
import { GroundDtoType, GroundUpdateDtoType } from '@/dtos/item/ground.dto';
import { Ground } from '@/types/item/ground.types';
import { formatDocument } from '../helpers/database.helper';

export class GroundServerService {
	static async getOne(id: string) {
		const ground = await GroundModel.findById(id);
		if (!ground) return null;
		return formatDocument<Ground>(ground);
	}

	static async getAll(filters: {
		keywords?: string;
		user?: string;
		city?: string;
		town?: string;
	}) {
		const grounds = await GroundModel.find({
			...(filters.keywords
				? { name: { $regex: filters.keywords, $options: 'i' } }
				: {}),
			...(filters.user ? { createdBy: filters.user } : {}),
			...(filters.city ? { 'address.city': filters.city } : {}),
			...(filters.town ? { 'address.town': filters.town } : {}),
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
		});
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
