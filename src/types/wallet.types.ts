import { ClubSubscription } from './item/club.types';
import { GroundReservation } from './item/ground.types';
import { User } from './user.types';
import { Record } from './utils.types';

export enum TransactionSubject {
	DEPOSIT = 'deposit',
	GROUND_RESERVATION_REFUND = 'ground_reservation_refund',
	CLUB_SUBSCRIPTION_REFUND = 'club_subscription_refund',
}

export interface Transaction extends Record {
	amount: number;
	subject: TransactionSubject;

	sender?: string | Wallet | null;
	receiver?: string | Wallet | null;

	refundGroundReservation?: string | GroundReservation | null;
	refundClubSubscription?: string | ClubSubscription | null;
}

export interface Wallet {
	balance: number;
	user: string | User;
}
