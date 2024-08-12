import { Address, Record } from './general.interface';
import { User } from './user.interface';

export interface Review {
	rating: number;
	comment: string;
	user: string | User;
}

export interface Timeframe {
	from: string;
	to: string;
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

export interface Item extends Record {
	name: string;
	description: string;
	address: Address;
	images: string[];
	avgRating: number;
	reviews: Review[];
	openingHours: OpeningHours;
}

export interface BusyHours {
	date: Date;
	hours: string[];
}

export interface Ground extends Item {
	minReservationTime: number;
	price: number;
	busyHours: BusyHours[];
	
	subscriptions: Subscription[];
}

export interface Club extends Item {
	subscriptions: Subscription[];
}

export interface Product extends Item {
	price: number;
}

export enum ItemCategory {
	PRODUCT = 'product',
	GROUND = 'ground',
	SERVICE = 'service',
}

export enum PricePeriodDuration {
	ONCE = 'once',
	MINUTE = 'minute',
	HOUR = 'hour',
	DAY = 'day',
	WEEK = 'week',
	MONTH = 'month',
	YEAR = 'year',
}

export interface SubscriptionPeriod {
	duration: PricePeriodDuration;
	amount: number;
}

export interface Subscription {
	name: string;
	description: string;
	features: string[];
	price: number;
	period: SubscriptionPeriod;
	discount: number;
	isDefault: boolean;
}

export interface Offer extends Record {
	name: string;
	description: string;
	images: string[];
	items: {
		quantity: number;
		item: string | Item;
		originalPrice: Subscription;
		discount: number;
	}[];
	endDate: string;
}
