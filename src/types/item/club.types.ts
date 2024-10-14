import { Address } from '../general.types';
import { Record } from '../utils.types';
import { Item } from './item.types';

export enum ClubSubscriptionPeriodDuration {
	ONCE = 'once',
	MINUTE = 'minute',
	HOUR = 'hour',
	DAY = 'day',
	WEEK = 'week',
	MONTH = 'month',
	YEAR = 'year',
}

export interface ClubSubscriptionPeriod {
	duration: ClubSubscriptionPeriodDuration;
	amount: number;
}

export interface ClubSubscriptionFeature {
	description: string;
}

export interface ClubSubscriptionDiscount {
	amount: number;
	endDate: string;
}

export interface ClubSubscription extends Record {
	club: string | Club;
	name: string;
	description: string;
	features: ClubSubscriptionFeature[];
	price: number;
	period: ClubSubscriptionPeriod;
	discount: ClubSubscriptionDiscount;
	isHighlighted: boolean;
}

export interface Club extends Item {
	address: Address;
}
