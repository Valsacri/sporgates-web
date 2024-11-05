import {
	GroundReservationDto,
	GroundReservationDtoType,
} from '@/dtos/item/ground/ground-reservation.dto';
import { setupDbConnection } from '@/server/config/mongodb.config';
import { GroundReservationServerService } from '@/server/services/ground-reservation.server-service';
import { GroundRerservationStatus } from '@/types/item/ground/ground-reservation.types';
import { NextRequest } from 'next/server';
import { GroundReservationNotificationServerService } from '@/server/services/notification/ground-reservation-notification.server-service';

export async function GET(req: NextRequest) {
	try {
		await setupDbConnection();

		const searchParams = req.nextUrl.searchParams;
		const business = searchParams.get('business') || undefined;
		const user = searchParams.get('user') || undefined;

		if (!business && !user) {
			return Response.json('Business or user is required', {
				status: 400,
			});
		}

		const ground = searchParams.get('ground') || undefined;
		const status = searchParams.get('status') || undefined;

		const grounds = await GroundReservationServerService.getPage({
			business,
			user,
			ground,
			status: status as GroundRerservationStatus,
		});

		return Response.json(grounds);
	} catch (error) {
		console.error(error);
		return Response.json(error, {
			status: 500,
		});
	}
}

export async function POST(req: NextRequest) {
	try {
		await setupDbConnection();

		const data: GroundReservationDtoType = await req.json();

		const validation = GroundReservationDto.safeParse(data);

		if (!validation.success) {
			return Response.json(validation.error, {
				status: 400,
			});
		}

		const reservation = await GroundReservationServerService.create(data);
		await GroundReservationNotificationServerService.sendNewReservation(
			reservation
		);

		return Response.json(reservation, {
			status: 201,
		});
	} catch (error) {
		console.error(error);
		return Response.json(error, {
			status: 500,
		});
	}
}
