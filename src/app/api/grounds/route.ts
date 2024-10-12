import { GroundDto, GroundDtoType } from '@/dtos/item/ground.dto';
import { setupDbConnection } from '@/server/config/mongodb.config';
import { getServerUser } from '@/server/helpers/http.helper';
import { GroundServerService } from '@/server/services/ground.server-service';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, res: Response) {
	try {
		await setupDbConnection();

		const user = getServerUser(req);

		const grounds = await GroundServerService.getAll(user.id);

		return Response.json(grounds, {
			status: 200,
		});
	} catch (error) {
		console.error(error);
		return Response.json(error, {
			status: 500,
		});
	}
}

export async function POST(req: Request, res: Response) {
	try {
		await setupDbConnection();

		const user = getServerUser(req);

		const data: GroundDtoType = await req.json();

		// validate data with zod schema
		const validation = GroundDto.safeParse(data);

		if (!validation.success) {
			return Response.json(validation.error, {
				status: 400,
			});
		}

		const ground = await GroundServerService.create(data, user.id);

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
