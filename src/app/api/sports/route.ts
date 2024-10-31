import { setupDbConnection } from '@/server/config/mongodb.config';
import { SportServerService } from '@/server/services/sport.server-service';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
	try {
		await setupDbConnection();

		const sports = await SportServerService.getAll();

		return Response.json(sports, {
			status: 200,
		});
	} catch (error) {
		console.error(error);
		return Response.json(error, {
			status: 500,
		});
	}
}
