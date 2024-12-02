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
		const match: Record<string, any> = {};

		if (filters.keywords) {
			match.$or = [
				{ name: { $regex: filters.keywords, $options: 'i' } },
				{ username: { $regex: filters.keywords, $options: 'i' } },
			];
		}
		if (filters.sport) {
			match.sports = filters.sport;
		}

		const addressFilters: Record<string, any> = {};
		if (filters.city) {
			addressFilters.city = filters.city;
		}
		if (filters.town) {
			addressFilters.town = filters.town;
		}
		if (filters.lat && filters.lng && filters.radius) {
			addressFilters.geoLocation = getGeoLocationQuery(filters);
		}

		const pipeline: any[] = [
			{ $match: match },
			{
				$lookup: {
					from: 'addresses', // Address collection name
					localField: 'address',
					foreignField: '_id',
					as: 'address',
				},
			},
			{ $unwind: { path: '$address', preserveNullAndEmptyArrays: true } },
			{
				$lookup: {
					from: 'cities', // City collection name
					localField: 'address.city',
					foreignField: '_id',
					as: 'address.city',
				},
			},
			{ $unwind: { path: '$address.city', preserveNullAndEmptyArrays: true } },
			{
				$lookup: {
					from: 'towns', // Town collection name
					localField: 'address.town',
					foreignField: '_id',
					as: 'address.town',
				},
			},
			{ $unwind: { path: '$address.town', preserveNullAndEmptyArrays: true } },
		];

		if (Object.keys(addressFilters).length > 0) {
			pipeline.push({ $match: { address: addressFilters } });
		}

		pipeline.push(
			{ $sort: { name: 1 } }, // Example sort, adjust as needed
			{ $skip: (page - 1) * limit },
			{ $limit: limit }
		);

		const users = await UserModel.aggregate(pipeline);

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
