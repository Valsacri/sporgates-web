import { Socials, Timeframe } from './general.types';
import { Address } from './geo.types';
import { User } from './user.types';
import { Record } from './utils.types';

export interface OpeningHours {
	monday: Timeframe[];
	tuesday: Timeframe[];
	wednesday: Timeframe[];
	thursday: Timeframe[];
	friday: Timeframe[];
	saturday: Timeframe[];
	sunday: Timeframe[];
}

export interface Business extends Record {
	name: string;
	username: string;
	description: string;
	slogan: string;
	logo: string;
	socials: Socials;

	owner: string | User;
	staff: string[] | User[];

	email: string;
	phoneNumber: string;
	address: string | Address;
}
