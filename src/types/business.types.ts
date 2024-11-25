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

export interface Contact {
	emails?: string[];
	phones?: string[];
	address: string | Address;
}

export interface Business extends Record {
	name: string;
	username: string;

	owner: string | User;
	staff: string[] | User[];

	bio?: string;
	avatar?: string;
	cover?: string;

	contact?: Contact;

	verifiedAt?: number;
	lastUsernameChangeAt?: number;
}
