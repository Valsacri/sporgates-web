import { Timeframe } from '../../general.types';
import { User } from '../../user.types';
import { Record } from '../../utils.types';
import { Business } from '../../business.types';
import { Ground } from './ground.types';

export enum GroundRerservationStatus {
	ONGOING = 'ongoing',
	PENDING = 'pending',
	ACCEPTED = 'accepted',
	REJECTED = 'rejected',
	CANCELLED = 'cancelled',
}

export interface GroundReservation extends Record {
	ref: string;
	business: string | Business;
	ground: string | Ground;
	user: string | User;
	date: number;
	timeframe: Timeframe;
	groundPrice: number;
	groundMinReservationTime: number;
	totalPrice: number;
	status: GroundRerservationStatus;
}
