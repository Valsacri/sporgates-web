import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { Axios } from './client/config/axios';
import { DecodedIdToken } from 'firebase-admin/auth';
import { PUBLIC_PAGES, PUBLIC_ROUTES } from './constants';
import { fromBearerToken, toBearerToken } from './helpers/http.helpers';

const ALLOWED_ORIGINS = [
	'http://localhost:3000',
	'https://nextjs-auth.vercel.app',
];

export async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;
	const origin = req.headers.get('origin') || '';
	const isApiRoute = pathname.startsWith('/api');
	const headers = buildHeaders(pathname, origin);

	const isPublic =
		PUBLIC_PAGES.includes(pathname) ||
		PUBLIC_ROUTES.includes(pathname) ||
		pathname === '/api/auth/verify';

	// Skip auth verification for public routes
	if (isPublic) {
		return NextResponse.next({ headers });
	}

	try {
		// Authenticate and return response with headers if successful
		const authResponse = await verifyUserSession(req);
		return authResponse instanceof NextResponse
			? authResponse
			: NextResponse.next({ headers: { ...headers, ...authResponse.headers } });
	} catch (error: any) {
		console.error(error);

		// Handle errors and redirect based on route type
		return isApiRoute
			? NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
			: NextResponse.redirect(new URL('/sign-in', req.url));
	}
}

// Helper to build CORS headers
function buildHeaders(pathname: string, origin?: string) {
	const headers: Record<string, string> = {
		'x-pathname': pathname,
		'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type, Authorization',
	};
	if (origin && ALLOWED_ORIGINS.includes(origin)) {
		headers['Access-Control-Allow-Origin'] = origin;
	}
	return headers;
}

// Fetch user session data and verify authentication
async function verifyUserSession(req: NextRequest) {
	const sessionCookie = cookies().get('session')?.value;
	const authorizationToken = fromBearerToken(req.headers.get('Authorization'));
	const isApiRoute = req.nextUrl.pathname.startsWith('/api');

	if (isApiRoute && !sessionCookie && !authorizationToken) {
		return NextResponse.json({ message: 'No auth provided' }, { status: 401 });
	}

	if (!isApiRoute && !sessionCookie) {
		return NextResponse.redirect(new URL('/sign-in', req.url));
	}

	// Verify the session or token
	const res = await Axios.post<{
		decodedIdToken: DecodedIdToken;
		token: string;
	}>(
		'auth/verify',
		{ sessionCookie, authorizationToken },
		{
			headers: {
				Authorization: toBearerToken(authorizationToken),
			},
		}
	);

	return {
		headers: {
			decodedIdToken: JSON.stringify(res.data.decodedIdToken),
			token: res.data.token,
		},
	};
}

export const config = {
	matcher: [
		'/((?!_next|static|favicon.ico|manifest.webmanifest|robots.txt|images|svg).*)',
	],
};
