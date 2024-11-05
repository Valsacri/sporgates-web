import { setupDbConnection } from '@/server/config/mongodb.config';
import { BusinessServerService } from '@/server/services/business.server-service';
import { UserServerService } from '@/server/services/user.server-service';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, res: Response) {
	try {
		await setupDbConnection();

		const { searchParams } = req.nextUrl;
		const keywords = searchParams.get('keywords') || undefined;

		const [users, businesses] = await Promise.all([
			UserServerService.getPage({ keywords }, 1, 5),
			BusinessServerService.getPage({ keywords }, 1, 5),
		]);

		return Response.json(
			{
				users,
				businesses,
			},
			{
				status: 200,
			}
		);
	} catch (error) {
		console.error(error);
		return Response.json(error, {
			status: 500,
		});
	}
}
