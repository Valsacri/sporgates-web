import { FilterQuery } from 'mongoose';
import { GroundReservationModel } from '../models/item/ground-reservation.model';
import {
	GroundReservationDtoType,
	GroundReservationUpdateDtoType,
} from '@/dtos/item/ground.dto';
import {
	GroundRerservationStatus,
	GroundReservation,
} from '@/types/item/ground.types';
import { formatDocument } from '../helpers/database.helper';

export class GroundReservationServerService {
	static async getOne(id: string) {
		const reservation = await GroundReservationModel.findById(id);
		if (!reservation) return null;
		return formatDocument<GroundReservation>(reservation);
	}

	static async getAll(filters: {
		business: string;
		ground?: string;
		status: GroundRerservationStatus;
	}) {
		const query = {
			business: filters.business,
		} as FilterQuery<GroundReservation>;

		if (filters.ground) {
			query.ground = filters.ground;
		}
		if (filters.status) {
			query.status = filters.status;
		}

		const reservations = await GroundReservationModel.find(query)
			.sort({ createdAt: -1 })
			.populate('ground');

		return formatDocument<GroundReservation[]>(reservations);
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

	static async create(data: GroundReservationDtoType, createdBy?: string) {
		const reservation = await GroundReservationModel.create({
			createdBy,
			...data,
		});
		return formatDocument<GroundReservation>(reservation);
	}

	static async update(
		id: string,
		data: GroundReservationUpdateDtoType,
		updatedBy?: string
	) {
		const reservation = await GroundReservationModel.findByIdAndUpdate(
			id,
			{ updatedBy, ...data },
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

	static async getReservedTimeframes(groundId: string, dateTimestamp: number) {
		const endOfDayTimestamp = dateTimestamp + 24 * 60 * 60 * 1000 - 1;

		const _reservations = await GroundReservationModel.find({
			ground: groundId,
			date: {
				$gte: dateTimestamp,
				$lt: endOfDayTimestamp,
			},
		});

		const reservations = formatDocument<GroundReservation[]>(_reservations);

		return reservations.map((reservation) => reservation.timeframe);
	}
}
