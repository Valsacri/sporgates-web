import { auth } from 'firebase-admin';
import { UserModel } from '../../models/user.model';
import { SignUpDtoType } from '@/dtos/user.dto';
import { UserServerService } from '../user.server-service';
import { cookies, headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { Axios } from '@/client/config/axios';
import { fromBearerToken } from '@/helpers/http.helpers';
import { redirect } from 'next/navigation';
import { AuthUser } from '@/types/user.types';

export class AuthServerService {
	static async signUp(data: SignUpDtoType) {
		return await UserModel.create(data);
	}

	static async signIn(token: string) {
		const { uid } = await auth().verifyIdToken(token);

		return await UserServerService.getOneByUid(uid);
	}

	static async verifyApiAuth(req: NextRequest) {
		const sessionCookie = cookies().get('session')?.value;
		const authorizationToken = fromBearerToken(
			req.headers.get('Authorization')
		);

		if (!sessionCookie && !authorizationToken) {
			return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
		}

		try {
			const res = await Axios.post<AuthUser>('auth/verify', {
				sessionCookie,
				authorizationToken,
			});

			return res.data;
		} catch (error) {
			console.error('Authentication verification failed:', error);
			return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
		}
	}

	static async verifyPageAuth() {
		const sessionCookie = cookies().get('session')?.value;
		const authorizationToken = fromBearerToken(headers().get('Authorization'));

		if (!sessionCookie && !authorizationToken) {
			redirect('/sign-in');
		}

		let shouldRedirect = false;
		let authUser: AuthUser | null = null;

		try {
			const res = await Axios.post<AuthUser>('auth/verify', {
				sessionCookie,
				authorizationToken,
			});

			authUser = res.data;
		} catch (error) {
			console.error('Authentication verification failed:', error);
			shouldRedirect = true;
		}

		if (shouldRedirect) {
			redirect('/sign-in');
		}

		return authUser as AuthUser;
	}
}
