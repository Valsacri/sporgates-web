import { initFirebaseAdminApp } from '@/server/config/firebase-admin.config';
import { AuthUser } from '@/types/user.types';
import { auth } from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/auth';

export async function POST(req: Request, res: Response) {
	try {
		initFirebaseAdminApp();

		const { sessionCookie, authorizationToken } = await req.json();

		let decodedIdToken: DecodedIdToken = {} as DecodedIdToken;
		let token: string = '';

		try {
			if (sessionCookie) {
				decodedIdToken = await auth().verifySessionCookie(sessionCookie, true);
			} else if (authorizationToken) {
				decodedIdToken = await auth().verifyIdToken(authorizationToken, true);
				token = authorizationToken;
			}
		} catch (error) {
			return Response.json(error, { status: 401 });
		}

		const user = await auth().getUser(decodedIdToken.uid);
		const customClaims = user.customClaims || {};

		const authUser: AuthUser = {
			...decodedIdToken as any,
			...customClaims,
		};

		return Response.json(
			{ authUser, token },
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
