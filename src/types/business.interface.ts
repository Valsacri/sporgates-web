import { Address, Record } from './general.interface';

export interface Ground extends Record {
	name: string;
	description: string;
	address: Address;
	images: string[];
	prices: Price[];
	rating: number;
	reviews: number;
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
