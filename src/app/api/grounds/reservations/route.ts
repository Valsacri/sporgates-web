import {
	GroundReservationDto,
	GroundReservationDtoType,
} from '@/dtos/item/ground/ground-reservation.dto';
import { setupDbConnection } from '@/server/config/mongodb.config';
import { HttpHelper } from '@/server/helpers/http.helper';
import { NotificationServerService } from '@/server/services/notification/notification.server-service';
import { GroundReservationServerService } from '@/server/services/ground-reservation.server-service';
import { GroundRerservationStatus } from '@/types/item/ground/ground-reservation.types';
import { NextRequest } from 'next/server';
import { GroundReservationNotificationServerService } from '@/server/services/notification/ground-reservation-notification.server-service';

export async function GET(req: NextRequest) {
	try {
		await setupDbConnection();

		const searchParams = req.nextUrl.searchParams;
		const business = searchParams.get('business');

		if (!business) {
			return Response.json('Business is required', {
				status: 400,
			});
		}

		const ground = searchParams.get('ground') || undefined;
		const status = searchParams.get('status') || undefined;

		const grounds = await GroundReservationServerService.getPage({
			business,
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

		const { userId } = HttpHelper.getContextAuthUser();
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
