import { setupDbConnection } from '@/server/config/mongodb.config';
import { GroundReservationServerService } from '@/server/services/ground-reservation.server-service';
import { NextRequest } from 'next/server';

export async function GET(
	req: NextRequest,
	{ params }: { params: { id: string; date: string } }
) {
	try {
		await setupDbConnection();

		const timeframes =
			await GroundReservationServerService.getReservedTimeframes(
				params.id,
				Number(params.date)
			);

		return Response.json(timeframes);
	} catch (error) {
		console.error(error);
		return Response.json(error, {
			status: 500,
		});
	}
}
