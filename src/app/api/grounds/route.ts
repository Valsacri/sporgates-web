import { GroundDto, GroundDtoType } from '@/dtos/item/ground.dto';
import { setupDbConnection } from '@/server/config/mongodb.config';
import { HttpHelper } from '@/server/helpers/http.helper';
import { GroundServerService } from '@/server/services/ground.server-service';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, res: Response) {
	try {
		await setupDbConnection();

		const { searchParams } = req.nextUrl;
		const keywords = searchParams.get('keywords') || undefined;
		const sport = searchParams.get('sport') || undefined;
		const business = searchParams.get('business') || undefined;
		const city = searchParams.get('city') || undefined;
		const town = searchParams.get('town') || undefined;
		const lat = Number(searchParams.get('lat')) || undefined;
		const lng = Number(searchParams.get('lng')) || undefined;
		const radius = Number(searchParams.get('radius')) || undefined;

		const grounds = await GroundServerService.getAll({
			keywords,
			sport,
			business,
			city,
			town,
			lat,
			lng,
			radius,
		});

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

		const { userId } = HttpHelper.getContextAuthUser();

		const data: GroundDtoType = await req.json();

		// validate data with zod schema
		const validation = GroundDto.safeParse(data);

		if (!validation.success) {
			return Response.json(validation.error, {
				status: 400,
			});
		}

		const ground = await GroundServerService.create(data, userId);

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
