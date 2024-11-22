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
	email?: string;
	phone?: string;
}

export interface Business extends Record {
	name: string;
	username: string;
	email: string;
	phone: string;
	address: string | Address;

	owner: string | User;
	staff: string[] | User[];
	
	avatar?: string;
	cover?: string;
	bio?: string;
	
	contact?: Contact;
	
	openingHours: OpeningHours;
	
	verifiedAt?: number;

	// socials?: Socials;
}
