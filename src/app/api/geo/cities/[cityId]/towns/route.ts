import { setupDbConnection } from '@/server/config/mongodb.config';
import { TownServerService } from '@/server/services/geo/town.server-service';
import { NextRequest } from 'next/server';

export async function GET(
	req: NextRequest,
	{ params }: { params: { cityId: string } }
) {
	try {
		await setupDbConnection();

		const towns = await TownServerService.getPage(params.cityId);

		return Response.json(towns, {
			status: 200,
		});
	} catch (error) {
		console.error(error);
		return Response.json(error, {
			status: 500,
		});
	}
}
