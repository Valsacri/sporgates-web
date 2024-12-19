import { GroundModel } from '../models/item/ground.model';
import {
	GroundDtoType,
	GroundUpdateDtoType,
} from '@/dtos/item/ground/ground.dto';
import { Ground } from '@/types/item/ground/ground.types';
import {
	formatDocument,
	getGeoLocationQuery,
} from '../helpers/database.helper';
import mongoose, { PipelineStage } from 'mongoose';

export class GroundServerService {
	static async getOne(id: string) {
		const ground = await GroundModel.findById(id).populate({
			path: 'address',
			populate: [
				{
					path: 'city',
				},
				{
					path: 'town',
				},
			],
		});
		if (!ground) return null;
		return formatDocument<Ground>(ground);
	}

	static async getPage(
		filters: {
			business?: string;
			keywords?: string;
			sport?: string;
			city?: string;
			town?: string;
			lat?: number;
			lng?: number;
			radius?: number;
			rating?: boolean; // Added rating filter
		},
		page = 1,
		limit = 10
	) {
		const match: Record<string, any> = {};
	
		if (filters.business) {
			match.business = new mongoose.Types.ObjectId(filters.business);
		}
		if (filters.keywords) {
			match.$or = [
				{ name: { $regex: filters.keywords, $options: 'i' } },
				{ username: { $regex: filters.keywords, $options: 'i' } },
			];
		}
		if (filters.sport) {
			match.sports = new mongoose.Types.ObjectId(filters.sport);
		}
	
		const addressFilters: Record<string, any> = {};
		if (filters.city) {
			addressFilters.city = new mongoose.Types.ObjectId(filters.city);
		}
		if (filters.town) {
			addressFilters.town = new mongoose.Types.ObjectId(filters.town);
		}
		if (filters.lat && filters.lng && filters.radius) {
			addressFilters.geoLocation = getGeoLocationQuery(filters);
		}
	
		const pipeline: PipelineStage[] = [
			{ $match: match },
			{
				$lookup: {
					from: 'addresses',
					localField: 'address',
					foreignField: '_id',
					as: 'address',
				},
			},
			{ $unwind: { path: '$address', preserveNullAndEmptyArrays: true } },
			{
				$lookup: {
					from: 'sports',
					localField: 'sports',
					foreignField: '_id',
					as: 'sports',
				},
			},
			{
				$lookup: {
					from: 'cities',
					localField: 'address.city',
					foreignField: '_id',
					as: 'address.city',
				},
			},
			{ $unwind: { path: '$address.city', preserveNullAndEmptyArrays: true } },
			{
				$lookup: {
					from: 'towns',
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
	
		// Add rating calculation if filters.rating is true
		if (filters.rating) {
			pipeline.push(
				{
					$lookup: {
						from: 'reviews',
						localField: '_id',
						foreignField: 'topic', // Assuming 'topic' in reviews refers to the ground
						as: 'reviews',
					},
				},
				{
					$addFields: {
						rating: {
							avgRating: { $avg: '$reviews.rating' },
							count: { $size: '$reviews' },
						},
					},
				}
			);
		}
	
		pipeline.push(
			{ $sort: { name: 1 } }, // Example sort, adjust as needed
			{ $skip: (page - 1) * limit },
			{ $limit: limit }
		);
	
		const grounds = await GroundModel.aggregate(pipeline);
	
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
