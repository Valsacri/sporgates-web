import { Axios } from '@/client/config/axios';
import { reviewTopicTypeToRoute } from '@/constants';
import { CreateReviewDtoType, UpdateReviewDtoType } from '@/dtos/review.dto';
import { RatingStats, Review, ReviewTopicType } from '@/types/review.types';

export class ReviewClientService {
	static async getOne(id: string) {
		const res = await Axios.get<Review>(`/reviews/${id}`);
		return res.data;
	}

	static async getPage(topicType: ReviewTopicType, topic: string) {
		const res = await Axios.get<Review[]>(
			`/reviews/${reviewTopicTypeToRoute[topicType]}/${topic}`
		);
		return res.data;
	}

	static async getRating(topicType: ReviewTopicType, topic: string) {
		const res = await Axios.get<RatingStats>(
			`/reviews/${reviewTopicTypeToRoute[topicType]}/${topic}/rating`
		);
		return res.data;
	}

	static async create(review: CreateReviewDtoType) {
		const res = await Axios.post<Review>('/reviews', review);
		return res.data;
	}

	static async update(id: string, review: UpdateReviewDtoType) {
		const res = await Axios.patch<Review>(`/reviews/${id}`, review);
		return res.data;
	}

	static async delete(id: string) {
		await Axios.delete(`/reviews/${id}`);
	}
}
