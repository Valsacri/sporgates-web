import { Axios } from '@/client/config/axios';
import { CreateReviewDtoType, UpdateReviewDtoType } from '@/dtos/review.dto';
import { Review } from '@/types/general.types';

export class ReviewClientService {
	static async getOne(id: string) {
		const res = await Axios.get<Review>(`/geo/reviews/${id}`);
		return res.data;
	}

	static async getByUser(userId: string) {
		const res = await Axios.get<Review[]>('/geo/reviews', {
			params: {
				user: userId,
			},
		});
		return res.data;
	}

	static async getByBusiness(businessId: string) {
		const res = await Axios.get<Review[]>('/geo/reviews', {
			params: {
				business: businessId,
			},
		});
		return res.data;
	}

	static async create(address: CreateReviewDtoType) {
		const res = await Axios.post<Review>('/geo/reviews', address);
		return res.data;
	}

	static async update(id: string, address: UpdateReviewDtoType) {
		const res = await Axios.patch<Review>(`/geo/reviews/${id}`, address);
		return res.data;
	}

	static async delete(id: string) {
		await Axios.delete(`/geo/reviews/${id}`);
	}
}
