import { GroundReservationStatusDto } from '@/dtos/item/ground.dto';
import { setupDbConnection } from '@/server/config/mongodb.config';
import { GroundReservationServerService } from '@/server/services/ground-reservation.server-service';
import { GroundRerservationStatus } from '@/types/item/ground.types';

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
