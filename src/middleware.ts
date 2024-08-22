import { Axios } from '@/client/config/axios';
import { User } from '@/types/user.types';
import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_ORIGINS = [
	'http://localhost:3000',
	'https://nextjs-auth.vercel.app',
];

export async function middleware(req: NextRequest) {
	try {
		// skip static files
		if (
			req.nextUrl.pathname.startsWith('/_next') ||
			req.nextUrl.pathname.startsWith('/static') ||
			req.nextUrl.pathname.startsWith('/favicon.ico') ||
			req.nextUrl.pathname.startsWith('/manifest.webmanifest') ||
			req.nextUrl.pathname.startsWith('/robots.txt') ||
			req.nextUrl.pathname.startsWith('/images') ||
			req.nextUrl.pathname.startsWith('/svg')
			// req.nextUrl.pathname.startsWith('/auth')
		) {
			return NextResponse.next();
		}

		const { pathname }: { pathname: string } = req.nextUrl;

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

		// check if request is to the api
		if (pathname.includes('/api') && !pathname.includes('/auth')) {
			try {
				const authorization = req.headers.get('authorization');

				// const res = { status: 200 };
				const res = await Axios.get<User>('auth', {
					headers: {
						Authorization: authorization,
					},
				});

				if (res.status === 401) {
					return NextResponse.json(
						{ message: 'Unauthorized' },
						{ status: 401 }
					);
				}
			} catch (error) {
				console.error(error);
				return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
			}
		}

		NextResponse.next({ headers });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: 'Server error' }, { status: 500 });
	}
}

export default middleware;
