import { initFirebaseAdminApp } from '@/server/config/firebase-admin.config';
import { setupDbConnection } from '@/server/config/mongodb.config';
import { auth } from 'firebase-admin';

export async function GET(req: Request, res: Response) {
	try {
		initFirebaseAdminApp();
		await setupDbConnection();

		const authorization = req.headers.get('Authorization');
		const token = authorization?.split('Bearer ')[1];

		if (!token) {
			return Response.json('Token missing', {
				status: 401,
			});
		}

		try {
			const { uid } = await auth().verifyIdToken(token);

			return Response.json(uid, {
				status: 200,
			});
		} catch (error) {
			console.error(error);
			return Response.json(error, {
				status: 401,
			});
		}
	} catch (error) {
		console.error(error);
		return Response.json(error, {
			status: 500,
		});
	}
}
