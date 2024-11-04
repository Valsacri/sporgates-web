import { Item } from '../item.types';
import { ClubSubscription } from '../club.types';
import { Address } from '../../geo.types';
import { Sport } from '../../sport.types';

export interface Ground extends Item {
	address: Address;
	minReservationTime: number;
	price: number;

	subscriptions: ClubSubscription[];

	sports: string[] | Sport[];
}
