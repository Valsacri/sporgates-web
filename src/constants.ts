import { GroundRerservationStatus } from './types/item/ground/ground-reservation.types';

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
	{ status: 403 }
);

export const statusMap = {
	[GroundRerservationStatus.ONGOING]: {
		textClassName: 'text-info-dark',
		bulletClassName: 'bg-info-dark',
		bgClassName: 'bg-info-light',
		text: 'Ongoing',
	},
	[GroundRerservationStatus.PENDING]: {
		textClassName: 'text-text-secondary-dark',
		bulletClassName: 'bg-text-secondary-dark',
		bgClassName: 'bg-secondary',
		text: 'Pending',
	},
	[GroundRerservationStatus.ACCEPTED]: {
		textClassName: 'text-success-dark',
		bulletClassName: 'bg-success-dark',
		bgClassName: 'bg-success-light',
		text: 'Accepted',
	},
	[GroundRerservationStatus.REJECTED]: {
		textClassName: 'text-warning-dark',
		bulletClassName: 'bg-warning-dark',
		bgClassName: 'bg-warning-light',
		text: 'Rejected',
	},
	[GroundRerservationStatus.CANCELLED]: {
		textClassName: 'text-danger-dark',
		bulletClassName: 'bg-danger-dark',
		bgClassName: 'bg-danger-light',
		text: 'Cancelled',
	},
} as const;
