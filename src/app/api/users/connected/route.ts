import { setupDbConnection } from '@/server/config/mongodb.config';
import { HttpHelper } from '@/server/helpers/http.helper';
import { UserServerService } from '@/server/services/user.server-service';

export async function GET(req: Request, res: Response) {
	try {
		await setupDbConnection();

		const authUser = HttpHelper.getContextAuthUser();

		const user = await UserServerService.getOneByUid(authUser.uid);

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
