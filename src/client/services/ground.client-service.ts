import { Ground } from '@/types/item/ground.types';
import { Create, Update } from '@/types/utils.types';

export class GroundClientService {
	static async getOne(id: string) {}

	static async getPage() {}

	static async create(data: Create<Ground>) {}

	static async update(id: string, data: Update<Ground>) {}

	static async delete(id: string) {}
}
