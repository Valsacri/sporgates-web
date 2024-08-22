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

export interface Subscription {
	name: string;
	description: string;
	features: string[];
	price: number;
	period: SubscriptionPeriod;
	discount: number;
	isDefault: boolean;
}

export interface Club extends Item {
	subscriptions: Subscription[];
}
