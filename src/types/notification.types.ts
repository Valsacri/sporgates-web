import {
	GroundRerservationStatus,
	GroundReservation,
} from './item/ground.types';
import { User } from './user.types';
import { Record } from './utils.types';

export enum NotificationSubject {
	NEW_GROUND_RESERVATION = 'new_ground_reservation',
	RESERVATION_STATUS_CHANGE = 'reservation_status_change',
}

export interface NewGroundReservationNotificationPayload {
	groundReservation: string | GroundReservation;
}
export interface GroundReservationStatusChangeNotificationPayload {
	groundReservation: string | GroundReservation;
	status: GroundRerservationStatus;
}

export interface NotificationPayload {
	new_ground_reservation?: NewGroundReservationNotificationPayload;
	reservation_status_change?: GroundReservationStatusChangeNotificationPayload;
}

export interface Notification extends Record {
	subject: NotificationSubject;
	payload: NotificationPayload;
	user: string | User;
	read: boolean;
	createdAt: number;
}
