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
	const { pathname }: { pathname: string } = req.nextUrl;
	const isApiRoute = pathname.startsWith('/api');

	try {
		const origin = req.headers.get('origin') || '';

		const headers: any = {
			'x-pathname': pathname,
			'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		};

		// // check if origin is allowed
		// if (ALLOWED_ORIGINS.includes(origin)) {
		// 	headers['Access-Control-Allow-Origin'] = origin;
		// }

		// check if the path is protected
		const isPublicPage = PUBLIC_PAGES.some((page) => page === pathname);
		const isPublicRoute = PUBLIC_ROUTES.some((route) => route === pathname);

		if (!isPublicPage && !isPublicRoute && pathname !== '/api/auth/verify') {
			try {
				const sessionCookie = cookies().get('session')?.value;
				const authorizationToken = fromBearerToken(
					req.headers.get('Authorization')
				);

				if (isApiRoute && !sessionCookie && !authorizationToken) {
					return NextResponse.json(
						{ message: 'No auth provided' },
						{ status: 401 }
					);
				}

				if (!isApiRoute && !sessionCookie) {
					return NextResponse.redirect(new URL('/sign-in', req.url));
				}

				const res = await Axios.post<{
					decodedIdToken: DecodedIdToken;
					token: string;
				}>(
					'auth/verify',
					{
						sessionCookie,
						authorizationToken,
					},
					{
						headers: {
							Authorization: toBearerToken(authorizationToken),
						},
					}
				);

				return NextResponse.next({
					headers: {
						...headers,
						decodedIdToken: JSON.stringify(res.data.decodedIdToken),
						token: res.data.token,
					},
				});
			} catch (error: any) {
				console.error(error);

				if (isApiRoute) {
					return NextResponse.json(
						{ message: 'Unauthorized' },
						{ status: 401 }
					);
				} else {
					if (error.response?.status === 401) {
						return NextResponse.redirect(new URL('/sign-in', req.url));
					} else {
						return NextResponse.redirect(new URL('/server-error', req.url));
					}
				}
			}
		}

		return NextResponse.next({ headers });
	} catch (error: any) {
		console.log(error);

		if (isApiRoute) {
			return NextResponse.json({ message: 'Server error' }, { status: 500 });
		} else {
			if (error.response?.status === 401) {
				return NextResponse.redirect(new URL('/sign-in', req.url));
			} else {
				return NextResponse.redirect(new URL('/server-error', req.url));
			}
		}
	}
}

export default middleware;

export const config = {
	matcher: [
		'/((?!_next|static|favicon.ico|manifest.webmanifest|robots.txt|images|svg).*)',
	],
};
