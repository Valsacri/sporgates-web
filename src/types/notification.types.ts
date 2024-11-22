import { User } from './user.types';
import { Record } from './utils.types';

export enum NotificationSubject {
	NEW_GROUND_RESERVATION = 'new_ground_reservation',
	GROUND_RESERVATION_STATUS_CHANGE = 'ground_reservation_status_change',
}

export interface Notification extends Record {
	subject: NotificationSubject;
	title: string;
	description: string;
	image?: string;
	user: string | User;
	infos: string[];
	read: boolean;
	url?: string;
}
