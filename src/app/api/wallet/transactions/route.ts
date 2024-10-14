import { setupDbConnection } from '@/server/config/mongodb.config';
import { getServerUser } from '@/server/helpers/http.helper';
import { TransactionServerService } from '@/server/services/transaction.server-service';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, res: Response) {
	try {
		await setupDbConnection();

		const user = getServerUser(req);

		const balance = await TransactionServerService.getPage(user.id);

		return Response.json(balance, {
			status: 201,
		});
	} catch (error) {
		console.error(error);
		return Response.json(error, {
			status: 500,
		});
	}
}
