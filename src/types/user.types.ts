import { DecodedIdToken } from 'firebase-admin/auth';
import { Socials } from './general.types';
import { Address } from './geo.types';
import { Record } from './utils.types';

export enum Role {
	SUPER_ADMIN = 'super_admin',
	ADMIN = 'admin',
	CHAMPION = 'champion',
	ATHLETE = 'athlete',
	COACH = 'coach',
	BUSINESS = 'business',
}

export type AuthUser = DecodedIdToken & { userId: string };

export interface User extends Record {
	uid: string;
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	roles: Role[];

	phoneNumber?: string;
	avatar?: string;
	cover?: string;
	bio?: string;
	birthday?: string;
	address?: Address;
	socials?: Socials;
	verifiedAt?: number;
}
