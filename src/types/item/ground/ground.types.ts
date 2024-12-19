import { Item } from '../item.types';
import { ClubSubscription } from '../club.types';
import { Address } from '../../geo.types';
import { Sport } from '../../sport.types';
import { RatingStats } from '@/types/review.types';

export interface Ground extends Item {
	address: string | Address;
	minReservationTime: number;
	price: number;

	subscriptions: ClubSubscription[];

	sports: string[] | Sport[];
	rating?: RatingStats
}
