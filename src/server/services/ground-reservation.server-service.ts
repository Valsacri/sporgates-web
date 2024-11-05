import { FilterQuery } from 'mongoose';
import { GroundReservationModel } from '../models/item/ground-reservation.model';
import {
	GroundReservationDtoType,
	GroundReservationUpdateDtoType,
} from '@/dtos/item/ground/ground-reservation.dto';
import {
	GroundRerservationStatus,
	GroundReservation,
} from '@/types/item/ground/ground-reservation.types';
import { formatDocument } from '../helpers/database.helper';
import { TimeframeHelper } from '@/helpers/datetime/timeframe.helpers';
import { uniqueRef } from '@/config/unique-ref.config';

export class GroundReservationServerService {
	static async getOne(id: string) {
		const reservation = await GroundReservationModel.findById(id);
		if (!reservation) return null;
		return formatDocument<GroundReservation>(reservation);
	}

	static async getPage(
		filters: {
			business?: string;
			user?: string;
			ground?: string;
			status: GroundRerservationStatus;
		},
		page = 1,
		limit = 10
	) {
		const query = {
		} as FilterQuery<GroundReservation>;

		if (filters.business) {
			query.business = filters.business;
		}
		if (filters.user) {
			query.user = filters.user;
		}
		if (filters.ground) {
			query.ground = filters.ground;
		}
		if (filters.status) {
			query.status = filters.status;
		}

		const reservations = await GroundReservationModel.find(query)
			.sort({ createdAt: -1 })
			.limit(limit)
			.skip((page - 1) * limit)
			.populate('ground')
			.populate('business')
			.populate('user');

		return formatDocument<GroundReservation[]>(reservations);
	}

	static async create(data: GroundReservationDtoType) {
		const ref = uniqueRef();

		const totalPrice = TimeframeHelper.getPrice(
			data.timeframe,
			data.groundMinReservationTime,
			data.groundPrice
		);

		const reservation = await GroundReservationModel.create({
			ref,
			totalPrice,

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
