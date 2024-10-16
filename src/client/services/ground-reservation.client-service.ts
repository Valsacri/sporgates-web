import {
	GroundReservationDtoType,
	GroundReservationUpdateDtoType,
} from '@/dtos/item/ground.dto';
import { Axios } from '../config/axios';
import {
	GroundRerservationStatus,
	GroundReservation,
} from '@/types/item/ground.types';
import { Timeframe } from '@/types/general.types';

export class GroundReservationClientService {
	static async getOne(id: string) {}

	static async getPage() {}

	static async getAll(ground: string, status: GroundRerservationStatus | null) {
		const res = await Axios.get<GroundReservation[]>(
			`/grounds/${ground}/reservations`,
			{
				params: {
					status,
				},
			}
		);
		return res.data;
	}

	static async create(data: GroundReservationDtoType) {
		const res = await Axios.post<GroundReservation>(
			`/grounds/${data.ground}/reservations`,
			data
		);
		return res.data;
	}

	static async update(id: string, data: GroundReservationUpdateDtoType) {
		const res = await Axios.patch<GroundReservation>(
			`/grounds/reservations/${id}`,
			data
		);
		return res.data;
	}

	static async delete(id: string) {
		const res = await Axios.delete(`/grounds/reservations/${id}`);
		return res.data;
	}

	static async getReservedTimeframes(groundId: string, dateTimestamp: number) {
		const res = await Axios.get<Timeframe[]>(
			`/grounds/${groundId}/reservations/timeframes/${dateTimestamp}`
		);
		return res.data;
	}

	static async updateStatus(id: string, status: GroundRerservationStatus) {
		const res = await Axios.patch<GroundReservation>(
			`/grounds/reservations/${id}/status/${status}`
		);
		return res.data;
	}
}
