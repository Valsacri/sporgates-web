import { User } from '@/types/user.types';
import { Update } from '@/types/utils.types';
import { UserModel } from '../models/user.model';
import { CreateUserDtoType } from '@/dtos/user.dto';
import { formatDocument } from '../helpers/database.helper';

export class UserServerService {
	static async getOne(id: string) {
		const user = await UserModel.findById(id);
		if (!user) return null;
		return formatDocument<User>(user);
	}

	static async getOneByUid(uid: string) {
		const user = await UserModel.findOne({ uid });
		if (!user) return null;
		return formatDocument<User>(user);
	}

	static async getPage(
		page: number,
		limit: number,
		query: Record<string, unknown>
	) {
		const users = await UserModel.find(query, null, {
			limit,
			skip: page * limit,
		});
		return formatDocument<User[]>(users);
	}

	static async create(data: CreateUserDtoType) {
		const user = await UserModel.create(data);
		if (!user) return null;
		return formatDocument<User>(user);
	}

	static async update(id: string, data: Update<User>) {
		const user = await UserModel.findByIdAndUpdate(id, data, {
			new: true,
		});
		if (!user) return null;
		return formatDocument<User>(user);
	}

	static async delete(id: string) {
		const user = await UserModel.findByIdAndDelete(id);
		if (!user) return null;
		return formatDocument<User>(user);
	}
}
