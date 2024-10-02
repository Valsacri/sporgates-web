import {
	GroundReservationDtoType,
	GroundReservationUpdateDtoType,
} from '@/dtos/item/ground.dto';
import { Axios } from '../config/axios';
import { GroundReservation } from '@/types/item/ground.types';

export class GroundReservationClientService {
	static async getOne(id: string) {}

	static async getPage() {}

	static async getAll() {
		const res = await Axios.get<GroundReservation[]>('/grounds/reservations');
		return res.data;
	}

	static async create(data: GroundReservationDtoType) {
		const res = await Axios.post<GroundReservation>(
			`/grounds/reservations`,
			data
		);
		return res.data;
	}

	static async update(id: string, data: GroundReservationUpdateDtoType) {
		const res = await Axios.patch<GroundReservation>(
			`/ground/reservations/${id}`,
			data
		);
		return res.data;
	}

	static async delete(id: string) {
		const res = await Axios.delete(`/ground/reservations/${id}`);
		return res.data;
	}
}
