import { Address, Record } from './general.interface';

export interface Ground extends Record {
	name: string;
	description: string;
	address: Address;
	images: string[];
	price: number;
}

export enum ItemCategory {
	PRODUCT = 'product',
	GROUND = 'ground',
	SERVICE = 'service',
}

export interface Item extends Record {
	name: string;
	description: string;
	price: number;

	category: ItemCategory;
	images: string[];
}

export enum OfferDiscountType {
	PERCENTAGE = 'percentage',
	AMOUNT = 'amount',
}

export interface Offer extends Record {
	name: string;
	description: string;
	images: string[];
	items: {
		quantity: number;
		item: string | Item;
		disountType: OfferDiscountType;
		discount: number;
	}[];
	subscriptions: {
		quantity: number;
		subscription: string | Subscription;
		disountType: OfferDiscountType;
		discount: number;
	}[];
	endDate: string;
}

export enum SubscriptionDurationType {
	DAY = 'day',
	WEEK = 'week',
	MONTH = 'month',
	YEAR = 'year',
}

export interface Subscription extends Record {
	name: string;
	description: string;
	price: number;
	durationType: SubscriptionDurationType;
	duration: number;
	images: string[];
	items: string[] | Item[];
}
