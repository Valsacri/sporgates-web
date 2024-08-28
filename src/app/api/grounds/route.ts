import { GroundDto, GroundDtoType } from '@/dtos/item/ground.dto';
import { setupDbConnection } from '@/server/config/mongodb.config';
import { GroundServerService } from '@/server/services/ground.server-service';

export async function POST(req: Request, res: Response) {
	try {
		await setupDbConnection();

		const data: GroundDtoType = await req.json();

		// validate data with zod schema
		const validation = GroundDto.safeParse(data);

		if (!validation.success) {
			return Response.json(validation.error, {
				status: 400,
			});
		}

		const ground = await GroundServerService.create(data);

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
