import { GroundDtoType, GroundUpdateDtoType } from '@/dtos/item/ground.dto';
import { Axios } from '../config/axios';
import { Ground } from '@/types/item/ground.types';

export class GroundClientService {
	static async getOne(id: string) {}

	static async getAll(filters: {
		keywords?: string;
		user?: string;
		city?: string;
		town?: string;
		lat?: number;
		lng?: number;
		radius?: number;
	}) {
		const res = await Axios.get<Ground[]>('/grounds', {
			params: filters,
		});
		return res.data;
	}

	static async getPage() {}

	static async create(data: GroundDtoType) {
		const res = await Axios.post<Ground>('/grounds', data);
		return res.data;
	}

	static async update(id: string, data: GroundUpdateDtoType) {
		const res = await Axios.patch<Ground>(`/grounds/${id}`, data);
		return res.data;
	}

	static async delete(id: string) {
		const res = await Axios.delete<Ground>(`/grounds/${id}`);
		return res.data;
	}
}
