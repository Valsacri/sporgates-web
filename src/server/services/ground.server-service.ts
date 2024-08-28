import { FilterQuery } from 'mongoose';
import { GroundModel } from '../models/ground.model';
import { GroundDtoType, GroundUpdateDtoType } from '@/dtos/item/ground.dto';
import { Ground } from '@/types/item/ground.types';
import { formatDocument } from '../helpers/database.helper';

export class GroundServerService {
	static async getOne(id: string) {
		const ground = await GroundModel.findById(id);
		if (!ground) return null;
		return formatDocument<Ground>(ground);
	}

	static async getPage(page = 1, limit = 10, query: FilterQuery<Ground> = {}) {
		const grounds = await GroundModel.find(query, null, {
			limit,
			skip: (page - 1) * limit,
		});
		return formatDocument<Ground[]>(grounds);
	}
	static async create(data: GroundDtoType) {
		const ground = await GroundModel.create(data);
		return formatDocument<Ground>(ground);
	}

	static async update(id: string, data: GroundUpdateDtoType) {
		const ground = await GroundModel.findByIdAndUpdate(id, data, {
			new: true,
		});
		return formatDocument<Ground>(ground);
	}

	static async delete(id: string) {
		const ground = await GroundModel.findByIdAndDelete(id);
		return formatDocument<Ground>(ground);
	}
}
