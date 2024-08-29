import { FilterQuery } from 'mongoose';
import { GroundReservationModel } from '../models/item/ground-reservation.model';
import {
	GroundReservationDtoType,
	GroundReservationUpdateDtoType,
} from '@/dtos/item/ground.dto';
import { GroundReservation } from '@/types/item/ground.types';
import { formatDocument } from '../helpers/database.helper';

export class GroundReservationServerService {
	static async getOne(id: string) {
		const reservation = await GroundReservationModel.findById(id);
		if (!reservation) return null;
		return formatDocument<GroundReservation>(reservation);
	}

	static async getPage(
		page = 1,
		limit = 10,
		query: FilterQuery<GroundReservation> = {}
	) {
		const reservations = await GroundReservationModel.find(query, null, {
			limit,
			skip: (page - 1) * limit,
		});
		return formatDocument<GroundReservation[]>(reservations);
	}

	static async getPending() {
		const reservations = await GroundReservationModel.find({
			status: 'pending',
		});
		return formatDocument<GroundReservation[]>(reservations);
	}

	static async create(data: GroundReservationDtoType) {
		const reservation = await GroundReservationModel.create(data);
		return formatDocument<GroundReservation>(reservation);
	}

	static async update(id: string, data: GroundReservationUpdateDtoType) {
		const reservation = await GroundReservationModel.findByIdAndUpdate(
			id,
			data,
			{
				new: true,
			}
		);
		return formatDocument<GroundReservation>(reservation);
	}

	static async delete(id: string) {
		const reservation = await GroundReservationModel.findByIdAndDelete(id);
		return formatDocument<GroundReservation>(reservation);
	}
}
