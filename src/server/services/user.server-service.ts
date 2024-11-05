import { User } from '@/types/user.types';
import { Create, Update } from '@/types/utils.types';
import { UserModel } from '../models/user.model';
import { CreateUserDtoType } from '@/dtos/user.dto';
import {
	formatDocument,
	getGeoLocationQuery,
} from '../helpers/database.helper';
import { HttpHelper } from '../helpers/http.helper';
import { FilterQuery } from 'mongoose';

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
		const authUser = HttpHelper.getContextAuthUser();
		return await this.getOneByUid(authUser.uid);
	}

	static async getPage(
		filters: {
			keywords?: string;
			sport?: string;
			city?: string;
			town?: string;
			lat?: number;
			lng?: number;
			radius?: number;
		},
		page = 1,
		limit = 10
	) {
		const query = {} as FilterQuery<User>;

		if (filters.keywords) {
			query.$or = [
				{ name: { $regex: filters.keywords, $options: 'i' } },
				{ username: { $regex: filters.keywords, $options: 'i' } },
			];
		}
		if (filters.sport) {
			query.sports = filters.sport;
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

		const users = await UserModel.find(query)
			.collation({ locale: 'en', strength: 1 })
			.limit(limit)
			.skip((page - 1) * limit)
			.populate('address.city')
			.populate('address.town')
			.populate('sports');

		return formatDocument<User[]>(users);
	}

	static async create(data: Create<User>) {
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
