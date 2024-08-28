import { Item } from './item.types';

export enum SubscriptionPeriodDuration {
	ONCE = 'once',
	MINUTE = 'minute',
	HOUR = 'hour',
	DAY = 'day',
	WEEK = 'week',
	MONTH = 'month',
	YEAR = 'year',
}

export interface SubscriptionPeriod {
	duration: SubscriptionPeriodDuration;
	amount: number;
}

export interface SubscriptionFeature {
	description: string;
}

export interface SubscriptionDiscount {
	amount: number;
	endDate: string;
}

export interface Subscription {
	name: string;
	description: string;
	features: SubscriptionFeature[];
	price: number;
	period: SubscriptionPeriod;
	discount: SubscriptionDiscount;
	isHighlighted: boolean;
}

export interface Club extends Item {
	subscriptions: Subscription[];
}
