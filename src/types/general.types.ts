
export enum ProfileType {
	USER = 'user',
	BUSINESS = 'business',
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
