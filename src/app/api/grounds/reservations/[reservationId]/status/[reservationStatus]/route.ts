import { GroundReservationStatusDto } from '@/dtos/item/ground/ground-reservation.dto';
import { setupDbConnection } from '@/server/config/mongodb.config';
import { HttpHelper } from '@/server/helpers/http.helper';
import { GroundReservationServerService } from '@/server/services/ground-reservation.server-service';
import { GroundReservationNotificationServerService } from '@/server/services/notification/ground-reservation-notification.server-service';
import { NotificationServerService } from '@/server/services/notification/notification.server-service';
import { GroundRerservationStatus } from '@/types/item/ground/ground-reservation.types';

export async function PATCH(
	req: Request,
	{
		params: { reservationId, reservationStatus },
	}: {
		params: {
			reservationId: string;
			reservationStatus: GroundRerservationStatus;
		};
	}
) {
	try {
		await setupDbConnection();

		const { userId } = HttpHelper.getContextAuthUser();

		const validation = GroundReservationStatusDto.safeParse(reservationStatus);

		if (!validation.success) {
			return Response.json(validation.error, {
				status: 400,
			});
		}

		const reservation = await GroundReservationServerService.update(
			reservationId,
			{
				status: reservationStatus,
			}
		);
		await GroundReservationNotificationServerService.sendReservationStatusChange(
			userId,
			reservation
		);

		return Response.json(reservation, {
			status: 200,
		});
	} catch (error) {
		console.error(error);
		return Response.json(error, {
			status: 500,
		});
	}
}
