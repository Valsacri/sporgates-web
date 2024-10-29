import { Business } from '@/types/business.types';
import { Axios } from '../config/axios';
import { BusinessDtoType, BusinessUpdateDtoType } from '@/dtos/business.dto';

export class BusinessClientService {
	static async getOne(id: string) {
		const res = await Axios.get<Business>(`/businesses/${id}`);
		return res.data;
	}

	static async getAll(filters: { keywords?: string; user?: string }) {
		const res = await Axios.get<Business[]>('/businesses', {
			params: filters,
		});
		return res.data;
	}

	static async getPage() {}

	static async create(data: BusinessDtoType) {
		const res = await Axios.post<Business>('/businesses', data);
		return res.data;
	}

	static async update(id: string, data: BusinessUpdateDtoType) {
		const res = await Axios.patch<Business>(`/businesses/${id}`, data);
		return res.data;
	}

	static async delete(id: string) {
		const res = await Axios.delete<Business>(`/businesses/${id}`);
		return res.data;
	}
}
