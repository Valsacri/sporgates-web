import { User } from '@/types/user.types';
import { Update } from '@/types/utils.types';
import { UserModel } from '../models/user.model';
import { CreateUserDtoType } from '@/dtos/user.dto';
import { formatDocument } from '../helpers/database.helper';
import { cookies, headers } from 'next/headers';
import { DecodedIdToken } from 'firebase-admin/auth';

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

	static async getConnected() {
		const decodedIdToken = JSON.parse(
			headers().get('decodedIdToken')!
		) as DecodedIdToken;
		return await this.getOneByUid(decodedIdToken.uid);
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
