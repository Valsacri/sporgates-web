import { setupDbConnection } from '@/server/config/mongodb.config';
import { UserServerService } from '@/server/services/user.server-service';
import { NextRequest } from 'next/server';

export async function GET(
	req: NextRequest,
	{ params }: { params: { userId: string } }
) {
	try {
		await setupDbConnection();

		const user = await UserServerService.getOne(params.userId);

		return Response.json(user, {
			status: 200,
		});
	} catch (error) {
		console.error(error);
		return Response.json(error, {
			status: 500,
		});
	}
}

export async function PATCH(
	req: NextRequest,
	{ params }: { params: { userId: string } }
) {
	try {
		await setupDbConnection();

		const body = await req.json();

		const user = await UserServerService.update(params.userId, body);

		return Response.json(user, {
			status: 200,
		});
	} catch (error) {
		console.error(error);
		return Response.json(error, {
			status: 500,
		});
	}
}
