import { BusinessDto, BusinessDtoType } from '@/dtos/business.dto';
import { setupDbConnection } from '@/server/config/mongodb.config';
import { HttpHelper } from '@/server/helpers/http.helper';
import { BusinessServerService } from '@/server/services/business.server-service';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, res: Response) {
	try {
		await setupDbConnection();

		const { searchParams } = req.nextUrl;
		const keywords = searchParams.get('keywords') || undefined;
		const user = searchParams.get('user') || undefined;

		const grounds = await BusinessServerService.getAll({
			keywords,
			user,
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

		const data: BusinessDtoType = await req.json();

		// validate data with zod schema
		const validation = BusinessDto.safeParse(data);

		if (!validation.success) {
			return Response.json(validation.error, {
				status: 400,
			});
		}

		const business = await BusinessServerService.create(data, userId);

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
