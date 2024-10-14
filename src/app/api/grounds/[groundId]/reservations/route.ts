import {
	GroundReservationDto,
	GroundReservationDtoType,
} from '@/dtos/item/ground.dto';
import { setupDbConnection } from '@/server/config/mongodb.config';
import { getServerUser } from '@/server/helpers/http.helper';
import { GroundReservationServerService } from '@/server/services/ground-reservation.server-service';
import { GroundRerservationStatus } from '@/types/item/ground.types';
import { NextRequest } from 'next/server';

export async function GET(
	req: NextRequest,
	{ params: { groundId } }: { params: { groundId: string } }
) {
	try {
		await setupDbConnection();

		const searchParams = req.nextUrl.searchParams;
		const status = searchParams.get('status');

		const grounds = await GroundReservationServerService.getAll(
			groundId === 'all' ? null : groundId,
			status as GroundRerservationStatus
		);

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

		const user = getServerUser(req);

		const data: GroundReservationDtoType = await req.json();

		const validation = GroundReservationDto.safeParse(data);

		if (!validation.success) {
			return Response.json(validation.error, {
				status: 400,
			});
		}

		const ground = await GroundReservationServerService.create(data, user.id);

		return Response.json(ground, {
			status: 201,
		});
	} catch (error) {
		console.error(error);
		return Response.json(error, {
			status: 500,
		});
	}
}
