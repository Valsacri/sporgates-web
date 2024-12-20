import { Business } from '@/types/business.types';
import { Axios } from '../config/axios';
import {
	CreateBusinessDtoType,
	UpdateBusinessDtoType,
	UpdateBusinessProfileDtoType,
} from '@/dtos/business.dto';
import { User } from '@/types/user.types';
import { UpdateUsernameDtoType } from '@/dtos/user.dto';

export class BusinessClientService {
	static async getOne(id: string) {
		const res = await Axios.get<Business>(`/businesses/${id}`);
		return res.data;
	}

	static async getAll(filters: {
		keywords?: string;
		owner?: string;
		staff?: string;
	}) {
		const res = await Axios.get<Business[]>('/businesses', {
			params: filters,
		});
		return res.data;
	}

	static async getPage() {}

	static async getStaff(businessId: string) {
		const res = await Axios.get<User[]>(`/businesses/${businessId}/staff`);
		return res.data;
	}

	static async addStaff(businessId: string, staffId: string) {
		const res = await Axios.post<User[]>(`/businesses/${businessId}/staff`, {
			staff: staffId,
		});
		return res.data;
	}

	static async removeStaff(businessId: string, staffId: string) {
		const res = await Axios.delete<User>(
			`/businesses/${businessId}/staff/${staffId}`
		);
		return res.data;
	}

	static async create(data: CreateBusinessDtoType) {
		const res = await Axios.post<Business>('/businesses', data);
		return res.data;
	}

	static async update(id: string, data: UpdateBusinessDtoType) {
		const res = await Axios.patch<Business>(`/businesses/${id}`, data);
		return res.data;
	}

	static async delete(id: string) {
		const res = await Axios.delete<Business>(`/businesses/${id}`);
		return res.data;
	}

	static async updateProfile(businessId: string, data: UpdateBusinessProfileDtoType) {
		const res = await Axios.patch<Business>(
			`/businesses/${businessId}/profile`,
			data
		);
		return res.data;
	}

	static async updateUsername(businessId: string, data: UpdateUsernameDtoType) {
		const res = await Axios.patch<Business>(
			`/businesses/${businessId}/username`,
			data
		);
		return res.data;
	}
}
