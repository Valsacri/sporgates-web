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
