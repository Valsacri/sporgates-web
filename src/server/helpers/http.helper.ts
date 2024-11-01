import { AuthUser } from '@/types/user.types';
import { headers } from 'next/headers';

export class HttpHelper {
	static getPathname() {
		return headers().get('x-pathname')! as string;
	}

	static getContextToken() {
		return this.fromBearerToken(headers().get('Authorization'));
	}

	static getContextAuthUser() {
		return JSON.parse(headers().get('authUser')!) as AuthUser;
	}

	static toBearerToken(token?: string | null) {
		return !token ? '' : `Bearer ${token}`;
	}

	static fromBearerToken(bearerToken?: string | null) {
		return bearerToken?.split('Bearer ')[1] || '';
	}
}
