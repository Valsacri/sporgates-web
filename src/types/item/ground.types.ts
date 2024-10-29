import { DateTimeframes, Timeframe } from '../general.types';
import { Item } from './item.types';
import { ClubSubscription } from './club.types';
import { User } from '../user.types';
import { Record } from '../utils.types';
import { Address } from '../geo.types';
import { Sport } from '../sport.types';
import { Business } from '../business.types';

export enum GroundRerservationStatus {
	PENDING = 'pending',
	ACCEPTED = 'accepted',
	REJECTED = 'rejected',
	CANCELLED = 'cancelled',
}

export interface GroundReservation extends Record {
	ground: string | Ground;
	user: string | User;
	date: number;
	timeframe: Timeframe;
	totalPrice: number;
	status: GroundRerservationStatus;
}

export interface Ground extends Item {
	address: Address;
	minReservationTime: number;
	price: number;

	subscriptions: ClubSubscription[];

	sports: string[];
}
