import { Address, Record } from './general.interface';
import { User } from './user.interface';

export interface Review {
	rating: number;
	comment: string;
	user: string | User;
}

export interface Timeframe {
	from: number;
	to: number;
}

export interface OpeningHours {
	monday: Timeframe;
	tuesday: Timeframe;
	wednesday: Timeframe;
	thursday: Timeframe;
	friday: Timeframe;
	saturday: Timeframe;
	sunday: Timeframe;
}

export interface Ground extends Record {
	name: string;
	description: string;
	address: Address;
	images: string[];
	prices: Price[];
	openingHours: OpeningHours;
	minReservationTime: number;
	avgRating: number;
	reviews: Review[];
}

export enum ItemCategory {
	PRODUCT = 'product',
	GROUND = 'ground',
	SERVICE = 'service',
}

export enum PricePeriod {
	ONCE = 'once',
	HOUR = 'hour',
	DAY = 'day',
	WEEK = 'week',
	MONTH = 'month',
	YEAR = 'year',
}

export interface Price {
	name: string;
	description: string;
	features: string[];
	amount: number;
	period: PricePeriod;
	discount: number;
	isDefault: boolean;
}

export interface Item extends Record {
	name: string;
	description: string;
	prices: Price[];

	category: ItemCategory;
	images: string[];
}

export interface Offer extends Record {
	name: string;
	description: string;
	images: string[];
	items: {
		quantity: number;
		item: string | Item;
		originalPrice: Price;
		discount: number;
	}[];
	endDate: string;
}
