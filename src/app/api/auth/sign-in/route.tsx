import { SESSION_EXPIRATION } from '@/constants';
import { initFirebaseAdminApp } from '@/server/config/firebase-admin.config';
import { HttpHelper } from '@/server/helpers/http.helper';
import { auth } from 'firebase-admin';
import { cookies } from 'next/headers';

export async function POST(req: Request, res: Response) {
	try {
		initFirebaseAdminApp();

		try {
			const token = HttpHelper.getContextToken();
			const authUser = HttpHelper.getContextAuthUser();

			const sessionCookie = await auth().createSessionCookie(token, {
				expiresIn: SESSION_EXPIRATION,
			});

			cookies().set('session', sessionCookie, {
				httpOnly: true,
				path: '/',
				maxAge: SESSION_EXPIRATION,
				sameSite: 'lax',
			});

			return Response.json(authUser, {
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
