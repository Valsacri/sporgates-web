export const SESSION_EXPIRATION = 14 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
export const MIN_DEPOSIT_AMOUNT = 50;
export const GENERIC_ERROR_MESSAGE = 'An error happened, please try later..';
export const PUBLIC_PAGES = [
	'/sign-in',
	'/sign-up',
	'/server-error',
	'/unauthorized',
	'/profile',
	'/page',
	'/grounds',
	'/clubs',
];
export const AUTH_PAGES = ['/sign-in', '/sign-up'];
export const PUBLIC_ROUTES = ['/api/auth/sign-out'];

export const UNAUTHORIZED_RESPONSE = Response.json(
	{ message: 'Unauthorized' },
	{ status: 401 }
);
export const FORBIDDEN_RESPONSE = Response.json(
	{ message: 'Forbidden' },
	{ status: 401 }
);
