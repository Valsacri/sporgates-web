import { DecodedIdToken } from 'firebase-admin/auth';
import { headers } from 'next/headers';

export class HttpHelper {
	static getPathname() {
		return headers().get('x-pathname')! as string;
	}

	static getContextToken(req: Request) {
		return req.headers.get('token')! as string;
	}

	static getContextDecodedIdToken2() {
		return JSON.parse(headers().get('decodedIdToken')!) as DecodedIdToken;
	}

	static getContextDecodedIdToken(req: Request) {
		return JSON.parse(req.headers.get('decodedIdToken')!) as DecodedIdToken;
	}
}
