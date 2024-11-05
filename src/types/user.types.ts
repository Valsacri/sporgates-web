import { DecodedIdToken } from 'firebase-admin/auth';
import { Socials } from './general.types';
import { Address } from './geo.types';
import { Record } from './utils.types';
import { Sport } from './sport.types';

export type AuthUser = DecodedIdToken & { userId: string };

export interface User extends Record {
	uid: string;
	username: string;
	firstName: string;
	lastName: string;
	name: string;
	email: string;
	sports?: string[] | Sport[];

	avatar?: string;
	cover?: string;
	bio?: string;

	phoneNumber?: string;
	birthday?: string;
	address?: Address;
	socials?: Socials;
	verifiedAt?: number;
}
