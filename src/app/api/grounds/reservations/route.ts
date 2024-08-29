import { GroundReservationDto, GroundReservationDtoType } from '@/dtos/item/ground.dto';
import { setupDbConnection } from '@/server/config/mongodb.config';
import { GroundReservationServerService } from '@/server/services/ground-reservation.server-service';

export async function POST(req: Request, res: Response) {
	try {
		await setupDbConnection();

		const data: GroundReservationDtoType = await req.json();

		const validation = GroundReservationDto.safeParse(data);

		if (!validation.success) {
			return Response.json(validation.error, {
				status: 400,
			});
		}

		const ground = await GroundReservationServerService.create(data);

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
