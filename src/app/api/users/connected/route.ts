import { initFirebaseAdminApp } from '@/server/config/firebase-admin.config';
import { setupDbConnection } from '@/server/config/mongodb.config';
import { HttpHelper } from '@/server/helpers/http.helper';
import { UserServerService } from '@/server/services/user.server-service';
import { auth } from 'firebase-admin';

export async function GET(req: Request, res: Response) {
	try {
		initFirebaseAdminApp();
		await setupDbConnection();

		const decodedIdToken = HttpHelper.getContextDecodedIdToken(req);

		const user = await UserServerService.getOneByUid(decodedIdToken.uid);

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
