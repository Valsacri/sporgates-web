import { Address, DateTimeframes } from '../general.types';
import { Item } from './item.types';
import { Subscription } from './club.types';
import { User } from '../user.types';
import { Record } from '../utils.types';

export enum GroundRerservationStatus {
	PENDING = 'pending',
	ACCEPTED = 'accepted',
	REJECTED = 'rejected',
	CANCELLED = 'cancelled',
}

export interface GroundReservation extends Record {
	ground: string | Ground;
	user: string | User;
	dateTimeframes: DateTimeframes;
	totalPrice: number;
	status: GroundRerservationStatus;
}

export interface Ground extends Item {
	address: Address;
	minReservationTime: number;
	price: number;
	busyHours: DateTimeframes[];

	subscriptions: Subscription[];
}
