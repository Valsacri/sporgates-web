import {
	GroundReservationUpdateDto,
	GroundReservationUpdateDtoType,
} from '@/dtos/item/ground/ground.dto';
import { setupDbConnection } from '@/server/config/mongodb.config';
import { GroundReservationServerService } from '@/server/services/ground-reservation.server-service';

export async function GET(
	req: Request,
	{ params: { reservationId } }: { params: { reservationId: string } }
) {
	try {
		await setupDbConnection();

		const reservation = await GroundReservationServerService.getOne(
			reservationId
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

export async function PATCH(
	req: Request,
	{ params: { reservationId } }: { params: { reservationId: string } }
) {
	try {
		await setupDbConnection();

		const data: GroundReservationUpdateDtoType = await req.json();

		const validation = GroundReservationUpdateDto.safeParse(data);

		if (!validation.success) {
			return Response.json(validation.error, {
				status: 400,
			});
		}

		const reservation = await GroundReservationServerService.update(
			reservationId,
			data
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

export async function DELETE(
	req: Request,
	{ params: { reservationId } }: { params: { reservationId: string } }
) {
	try {
		await setupDbConnection();

		const reservation = await GroundReservationServerService.delete(
			reservationId
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
