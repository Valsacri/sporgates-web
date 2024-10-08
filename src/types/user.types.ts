import { Address, Socials } from './general.types';
import { Record } from './utils.types';

export enum Role {
	SUPER_ADMIN = 'super_admin',
	ADMIN = 'admin',
	CHAMPION = 'champion',
	ATHLETE = 'athlete',
	COACH = 'coach',
	BUSINESS = 'business',
}

export interface User extends Record {
	uid: string;
	firstName: string;
	lastName: string;
	email: string;
	role: Role;

	username?: string;
	phoneNumber?: string;
	avatar?: string;
	cover?: string;
	bio?: string;
	birthday?: string;
	address?: Address;
	socials?: Socials;
	verifiedAt?: number;
}
