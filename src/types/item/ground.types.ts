import { Address, DateTimeframes } from '../general.types';
import { Item } from './item.types';
import { Subscription } from './club.types';
import { User } from '../user.types';

export interface GroundReservation {
	ground: string | Ground;
	user: string | User;
	timeFrames: DateTimeframes;
}

export interface Ground extends Item {
	address: Address;
	minReservationTime: number;
	price: number;
	busyHours: DateTimeframes[];

	subscriptions: Subscription[];
}
