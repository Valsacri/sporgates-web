import { Ground } from '@/types/item/ground.types';
import { Create, Update } from '@/types/utils.types';
import { GroundModel } from '../models/ground.model';

export class GroundServerService {
	static async getOne(id: string) {
		return await GroundModel.findById(id);
	}

	static async getPage(
		page: number,
		limit: number,
		query: Record<string, unknown>
	) {
		return await GroundModel.find(query, null, {
			limit,
			skip: page * limit,
		});
	}
	static async create(data: Create<Ground>) {
		return await GroundModel.create(data);
	}

	static async update(id: string, data: Update<Ground>) {
		return await GroundModel.findByIdAndUpdate(id, data, {
			new: true,
		});
	}

	static async delete(id: string) {
		return await GroundModel.findByIdAndDelete(id);
	}
}
