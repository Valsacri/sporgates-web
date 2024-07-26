import { Address, Record, Socials } from './general.interface';

export enum Role {
	SUPER_ADMIN = 'super_admin',
	ADMIN = 'admin',
	CHAMPION = 'champion',
	ATHLETE = 'athlete',
	COACH = 'coach',
	BUSINESS = 'business',
}

export interface User extends Record {
	firstName: string;
	lastName: string;
	username: string;
	phoneNumber: string | null;
	email: string;
	avatar: string | null;
	cover: string | null;
	bio: string;
	birthday: string | null;
	location: string;
	role: Role;
	address: Address;
	socials: Socials;

	verifiedAt: number | null;
}
