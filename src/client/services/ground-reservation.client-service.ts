import {
	GroundReservationDtoType,
	GroundReservationUpdateDtoType,
} from '@/dtos/item/ground/ground-reservation.dto';
import { Axios } from '../config/axios';
import { Timeframe } from '@/types/general.types';
import {
	GroundRerservationStatus,
	GroundReservation,
} from '@/types/item/ground/ground-reservation.types';

export class GroundReservationClientService {
	static async getOne(id: string) {}

	static async getPage() {}

	static async getAll(filters: {
		business: string;
		ground?: string;
		status?: GroundRerservationStatus | null;
	}) {
		const res = await Axios.get<GroundReservation[]>(`/grounds/reservations`, {
			params: filters,
		});
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
			`/grounds/${groundId}/reservations/reserved-timeframes/${dateTimestamp}`
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
