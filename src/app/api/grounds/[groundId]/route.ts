import {
	GroundUpdateDto,
	GroundUpdateDtoType,
} from '@/dtos/item/ground/ground.dto';
import { setupDbConnection } from '@/server/config/mongodb.config';
import { GroundServerService } from '@/server/services/ground.server-service';

export async function PATCH(
	req: Request,
	{ params }: { params: { groundId: string } }
) {
	try {
		await setupDbConnection();

		const data: GroundUpdateDtoType = await req.json();

		// validate data with zod schema
		const validation = GroundUpdateDto.safeParse(data);

		if (!validation.success) {
			return Response.json(validation.error, {
				status: 400,
			});
		}

		const ground = await GroundServerService.update(params.groundId, data);

		return Response.json(ground, {
			status: 200,
		});
	} catch (error) {
		console.error(error);
		return Response.json(error, {
			status: 500,
		});
	}
}
