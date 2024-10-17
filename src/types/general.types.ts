import { User } from './user.types';
import { Record } from './utils.types';

export interface Review extends Record {
	rating: number;
	comment: string;
	user: string | User;
}

export interface Socials {
	instagram?: string;
	facebook?: string;
	x?: string;
	linkedin?: string;
	tiktok?: string;
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
