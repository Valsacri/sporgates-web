import { setupDbConnection } from '@/server/config/mongodb.config';
import { HttpHelper } from '@/server/helpers/http.helper';
import { NotificationServerService } from '@/server/services/alert.server-service';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
	try {
		await setupDbConnection();

		const { userId } = HttpHelper.getContextAuthUser();

		const notifications = await NotificationServerService.getPage(userId);

		return Response.json(notifications, {
			status: 200,
		});
	} catch (error) {
		console.error(error);
		return Response.json(error, {
			status: 500,
		});
	}
}
