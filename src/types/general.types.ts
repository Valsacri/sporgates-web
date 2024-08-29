import { User } from './user.types';
import { Record } from './utils.types';

export interface GeoLocation {
	lat: number;
	lng: number;
}

export interface Address {
	country: string;
	city: string;
	neighborhood: string;
	street: string;
	zip: string;
	geoLocation: GeoLocation;
	isHighlighted?: boolean;
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
	date: number;
	timeframes: Timeframe[];
}
