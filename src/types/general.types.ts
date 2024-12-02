import { Club } from './item/club.types';
import { Ground } from './item/ground/ground.types';
import { User } from './user.types';
import { Record } from './utils.types';

export enum ProfileType {
	USER = 'user',
	BUSINESS = 'business',
}

export interface Review extends Record {
	rating: number;
	comment: string;
	user?: string | User;
	ground?: string | Ground;
	club?: string | Club;
}

export interface Socials {
	instagram?: string;
	facebook?: string;
	x?: string;
	linkedin?: string;
	tiktok?: string;
	website?: string;
}

export interface Time {
	hours: number;
	minutes: number;
}

export interface Timeframe<T = Time> {
	start: T;
	end: T;
}

export interface DateTimeframes {
	date: number;
	timeframes: Timeframe[];
}
