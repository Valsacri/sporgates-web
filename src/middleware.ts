import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { fromBearerToken } from './helpers/http.helpers';
import { Axios } from './client/config/axios';
import { PUBLIC_ROUTES } from './constants';
import { AuthUser } from './types/user.types';

const ALLOWED_ORIGINS = [
	'http://localhost:3000',
	'https://nextjs-auth.vercel.app',
];

const verifyApiAuth = async (req: NextRequest) => {
	const sessionCookie = cookies().get('session')?.value;
	const authorizationToken = fromBearerToken(req.headers.get('Authorization'));

	if (!sessionCookie && !authorizationToken) {
		return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
	}

	try {
		const res = await Axios.post<AuthUser>('/auth/verify', {
			sessionCookie,
			authorizationToken,
		});

		return res.data;
	} catch (error) {
		console.error('Authentication verification failed:', error);
		return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
	}
};

// Main middleware function for lightweight tasks
export async function middleware(req: NextRequest) {
	const origin = req.headers.get('origin') || '';
	const { pathname } = req.nextUrl;

	const headers = buildHeaders(pathname, origin);

	if (pathname.startsWith('/api')) {
		headers['Content-Type'] = 'application/json';

		if (PUBLIC_ROUTES.includes(pathname) || pathname === '/api/auth/verify') {
			return NextResponse.next({ headers });
		}

		const result = await verifyApiAuth(req);

		if (result instanceof NextResponse) {
			return result;
		} else {
			headers.authUser = JSON.stringify(result.authUser);
		}
	}

	return NextResponse.next({ headers });
}

function buildHeaders(pathname: string, origin?: string) {
	const headers: Record<string, string> = {
		'x-pathname': pathname,
		'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		'Access-Control-Allow-Origin': '*',
	};
	if (origin && ALLOWED_ORIGINS.includes(origin)) {
		headers['Access-Control-Allow-Origin'] = origin;
	}
	return headers;
}

export const config = {
	matcher: [
		'/((?!_next|static|favicon.ico|manifest.webmanifest|robots.txt|images|svg).*)',
	],
};
