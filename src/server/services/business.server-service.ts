import { FilterQuery } from 'mongoose';
import {
	formatDocument, valueOrEmptyObject
} from '../helpers/database.helper';
import { Business } from '@/types/business.types';
import { BusinessModel } from '../models/business.model';
import { BusinessDtoType, BusinessUpdateDtoType } from '@/dtos/business.dto';
import { User } from '@/types/user.types';

export class BusinessServerService {
	static async getOne(id: string) {
		const business = await BusinessModel.findById(id)
			.populate('address.city')
			.populate('address.town');
		if (!business) return null;
		return formatDocument<Business>(business);
	}

	static async getAll(filters: { keywords?: string; user?: string }) {
		const businesses = await BusinessModel.find({
			...valueOrEmptyObject(filters.keywords, {
				name: { $regex: filters.keywords, $options: 'i' },
			}),
			...valueOrEmptyObject(filters.user, { staff: filters.user }),
		})
			.collation({ locale: 'en', strength: 1 })
			.populate('address.city')
			.populate('address.town');

		return formatDocument<Business[]>(businesses);
	}

	static async getPage(
		page = 1,
		limit = 10,
		query: FilterQuery<Business> = {}
	) {
		const businesses = await BusinessModel.find(query, null, {
			limit,
			skip: (page - 1) * limit,
		})
			.populate('address.city')
			.populate('address.town');

		return formatDocument<Business[]>(businesses);
	}

	static async getStaff(businessId: string) {
		const business = await BusinessModel.findById(businessId).populate('staff');
		if (!business) return null;
		return formatDocument<User[]>(business.staff);
	}

	static async addStaff(businessId: string, userId: string) {
		const business = await BusinessModel.findByIdAndUpdate(
			businessId,
			{ $addToSet: { staff: userId } },
			{ new: true }
		).populate('staff');
		if (!business) return [];
		return formatDocument<User[]>(business.staff);
	}

	static async removeStaff(businessId: string, userId: string) {
		const business = await BusinessModel.findByIdAndUpdate(
			businessId,
			{ $pull: { staff: userId } },
			{ new: true }
		).populate('staff');
		if (!business) return [];
		return formatDocument<User[]>(business.staff);
	}

	static async create(data: BusinessDtoType, createdBy?: string) {
		const business = await BusinessModel.create({ createdBy, ...data });

		return formatDocument<Business>(business);
	}

	static async update(
		id: string,
		data: BusinessUpdateDtoType,
		updatedBy?: string
	) {
		const business = await BusinessModel.findByIdAndUpdate(
			id,
			{ updatedBy, ...data },
			{
				new: true,
			}
		);

		return formatDocument<Business>(business);
	}

	static async delete(id: string) {
		const business = await BusinessModel.findByIdAndDelete(id);

		return formatDocument<Business>(business);
	}
}
