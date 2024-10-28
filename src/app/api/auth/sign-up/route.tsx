import { CreateUserDto, CreateUserDtoType } from '@/dtos/user.dto';
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

		const body: CreateUserDtoType = await req.json();

		const validation = CreateUserDto.safeParse(body);

		if (!validation.success) {
			return Response.json(validation.error, {
				status: 400,
			});
		}

		const user = await UserServerService.create(body, decodedIdToken.uid);

		await auth().setCustomUserClaims(decodedIdToken.uid, {
			userId: user.id,
		});

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
