import { User } from '@/types/user.types';
import { Update } from '@/types/utils.types';
import { UserModel } from '../models/user.model';
import { CreateUserDtoType } from '@/dtos/user.dto';

export class UserServerService {
	static async getOne(id: string) {
		return await UserModel.findById(id);
	}

	static async getOneByUid(uid: string) {
		return await UserModel.findOne({ uid });
	}

	static async getPage(
		page: number,
		limit: number,
		query: Record<string, unknown>
	) {
		return await UserModel.find(query, null, {
			limit,
			skip: page * limit,
		});
	}

	static async create(data: CreateUserDtoType) {
		return await UserModel.create(data);
	}

	static async update(id: string, data: Update<User>) {
		return await UserModel.findByIdAndUpdate(id, data, {
			new: true,
		});
	}

	static async delete(id: string) {
		return await UserModel.findByIdAndDelete(id);
	}
}
