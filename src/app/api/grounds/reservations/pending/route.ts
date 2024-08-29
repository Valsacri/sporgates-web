import { setupDbConnection } from '@/server/config/mongodb.config';
import { GroundReservationServerService } from '@/server/services/ground-reservation.server-service';

export async function GET() {
	try {
		await setupDbConnection();

		const reservations = await GroundReservationServerService.getPending();

		return Response.json(reservations, {
			status: 200,
		});
	} catch (error) {
		console.error(error);
		return Response.json(error, {
			status: 500,
		});
	}
}
