import { formatDocument } from '../helpers/database.helper';
import { Create, Update } from '@/types/utils.types';
import { RatingStats, Review, ReviewTopicType } from '@/types/review.types';
import { ReviewModel } from '../models/review.model';
import mongoose from 'mongoose';

export class ReviewServerService {
	static async getOne(id: string) {
		const review = await ReviewModel.findById(id);
		if (!review) return null;
		return formatDocument<Review>(review);
	}

	static async getPage(
		topicType: ReviewTopicType,
		topic: string,
		page = 1,
		limit = 10
	) {
		const reviews = await ReviewModel.find({
			topicType,
			topic,
		})
			.limit(limit)
			.skip((page - 1) * limit)
			.populate('createdBy');

		return formatDocument<Review[]>(reviews);
	}

	static async getRating(topicType: ReviewTopicType, topic: string) {
		const _avgRating = await ReviewModel.aggregate([
			{ $match: { topicType, topic: new mongoose.Types.ObjectId(topic) } },
			{
				$group: {
					_id: null,
					averageRating: { $avg: '$rating' },
				},
			},
		]);

		const count = await ReviewModel.countDocuments({ topicType, topic });
		let avgRating =
			_avgRating.length > 0 ? Number(_avgRating[0].averageRating) : 0;
		avgRating = Math.round(avgRating * 10) / 10;

		return {
			avgRating,
			count,
		} as RatingStats;
	}

	static async create(data: Create<Review>) {
		const review = await ReviewModel.create(data);

		return formatDocument<Review>(review);
	}

	static async update(id: string, data: Update<Review>, updatedBy?: string) {
		const review = await ReviewModel.findByIdAndUpdate(
			id,
			{ updatedBy, ...data },
			{
				new: true,
			}
		);
		return formatDocument<Review>(review);
	}

	static async delete(id: string) {
		const review = await ReviewModel.findByIdAndDelete(id);

		return formatDocument<Review>(review);
	}
}
