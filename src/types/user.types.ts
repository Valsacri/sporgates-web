import { DecodedIdToken } from 'firebase-admin/auth';
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
	
	avatar?: string;
	cover?: string;
	bio?: string;
	sports?: string[] | Sport[];

	phone?: string;
	addresses?: Address[];
	birthday?: string;

	verifiedAt?: number;
	lastUsernameChangeAt?: number;

	// socials?: Socials;
}
