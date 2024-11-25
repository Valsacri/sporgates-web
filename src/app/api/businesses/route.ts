import { CreateBusinessDto, CreateBusinessDtoType } from '@/dtos/business.dto';
import { setupDbConnection } from '@/server/config/mongodb.config';
import { HttpHelper } from '@/server/helpers/http.helper';
import { BusinessServerService } from '@/server/services/business.server-service';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, res: Response) {
	try {
		await setupDbConnection();

		const { searchParams } = req.nextUrl;
		const keywords = searchParams.get('keywords') || undefined;
		const owner = searchParams.get('owner') || undefined;
		const staff = searchParams.get('staff') || undefined;

		const grounds = await BusinessServerService.getPage({
			keywords,
			owner,
			staff,
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

		const data: CreateBusinessDtoType = await req.json();

		// validate data with zod schema
		const validation = CreateBusinessDto.safeParse(data);

		if (!validation.success) {
			return Response.json(validation.error, {
				status: 400,
			});
		}

		const business = await BusinessServerService.create({
			...data,
			owner: userId,
			staff: [userId],
		});

		return Response.json(business, {
			status: 201,
		});
	} catch (error) {
		console.error(error);
		return Response.json(error, {
			status: 500,
		});
	}
}
