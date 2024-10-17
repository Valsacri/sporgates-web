import { setupDbConnection } from '@/server/config/mongodb.config';
import { CityServerService } from '@/server/services/geo/city.server-service';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, res: Response) {
	try {
		await setupDbConnection();

		const cities = await CityServerService.getPage();

		return Response.json(cities, {
			status: 200,
		});
	} catch (error) {
		console.error(error);
		return Response.json(error, {
			status: 500,
		});
	}
}
