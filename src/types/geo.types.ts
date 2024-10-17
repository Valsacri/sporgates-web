import { Record } from './utils.types';

export interface City extends Record {
	name: string;
}

export interface Town extends Record {
	name: string;
	city: string | City;
}

export interface GeoLocation {
	lat: number;
	lng: number;
}

export interface Address {
	city: string | City;
	town: string | Town;
	street: string;
	zip: string;
	geoLocation: GeoLocation;
	isHighlighted?: boolean;
}
