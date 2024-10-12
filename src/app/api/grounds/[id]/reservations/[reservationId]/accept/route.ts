import { setupDbConnection } from "@/server/config/mongodb.config";
import { GroundReservationServerService } from "@/server/services/ground-reservation.server-service";
import { GroundRerservationStatus } from "@/types/item/ground.types";

export async function PATCH(
	req: Request,
	{ params: { reservationId } }: { params: { reservationId: string } }
) {
	try {
		await setupDbConnection();

		const reservation = await GroundReservationServerService.update(
			reservationId,
			{
				status: GroundRerservationStatus.ACCEPTED,
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
