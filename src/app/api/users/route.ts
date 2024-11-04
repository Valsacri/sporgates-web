import { CreateUserDto, CreateUserDtoType } from '@/dtos/user.dto';
import { setupDbConnection } from '@/server/config/mongodb.config';
import { UserServerService } from '@/server/services/user.server-service';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, res: Response) {
	try {
		await setupDbConnection();

		const { searchParams } = req.nextUrl;
		const keywords = searchParams.get('keywords') || undefined;
		const sport = searchParams.get('sport') || undefined;
		const city = searchParams.get('city') || undefined;
		const town = searchParams.get('town') || undefined;
		const lat = Number(searchParams.get('lat')) || undefined;
		const lng = Number(searchParams.get('lng')) || undefined;
		const radius = Number(searchParams.get('radius')) || undefined;

		const users = await UserServerService.getPage({
			keywords,
			sport,
			city,
			town,
			lat,
			lng,
			radius,
		});

		return Response.json(users, {
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

		const data: CreateUserDtoType = await req.json();

		// validate data with zod schema
		const validation = CreateUserDto.safeParse(data);

		if (!validation.success) {
			return Response.json(validation.error, {
				status: 400,
			});
		}

		const user = await UserServerService.create(data);

		return Response.json(user, {
			status: 201,
		});
	} catch (error) {
		console.error(error);
		return Response.json(error, {
			status: 500,
		});
	}
}
