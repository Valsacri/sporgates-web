import { Business, OpeningHours } from '../business.types';
import { Review } from '../general.types';
import { Record } from '../utils.types';

export interface Item extends Record {
	name: string;
	description: string;
	images: string[];
	openingHours: OpeningHours;
	avgRating: number;
	reviews: string[] | Review[];
	business: string | Business;
}

export interface Offer {
	// name: string;
	// description: string;
	// images: string[];
	// items: {
	// 	quantity: number;
	// 	item: string | Item;
	// 	originalPrice: Subscription;
	// 	discount: number;
	// }[];
	// endDate: string;

	originalPrice: number;
	disountType: 'percentage' | 'amount';
	discount: number;
	endDate: string;
}
