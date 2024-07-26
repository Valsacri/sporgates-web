import { Item } from './business.interface';
import { User } from './user.interface';

export interface Record {
	id: string;

	createdAt: number;
	updatedAt: number | null;
	deletedAt: number | null;

	createdBy: string;
	updatedBy: string | null;
	deletedBy: string | null;
}

export interface Address extends Record {
	country: string;
	city: string;
	neighborhood: string;
	street: string;
	zip: string;
	geoLocation: {
		lat: number;
		lng: number;
	};
}

export interface Socials {
	instagram: string | null;
	facebook: string | null;
	x: string | null;
	linkedin: string | null;
	tiktok: string | null;
}

export interface Review extends Record {
	rating: number;
	comment: string;

	item: string | Item | null;
	champion: string | User | null;
}
