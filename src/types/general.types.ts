import { User } from './user.types';
import { Record } from './utils.types';

export interface Address {
	country: string;
	city: string;
	neighborhood: string;
	street: string;
	zip: string;
	geoLocation: {
		lat: number;
		lng: number;
	};
	isDefault?: boolean;
}

export interface Review extends Record {
	rating: number;
	comment: string;
	user: string | User;
}

export interface Socials {
	instagram?: string;
	facebook?: string;
	x?: string;
	linkedin?: string;
	tiktok?: string;
}

export interface Timeframe {
	from: {
		hours: number;
		minutes: number;
	};
	to: {
		hours: number;
		minutes: number;
	};
}

export interface DateTimeframes {
	date: Date;
	hours: Timeframe[];
}
