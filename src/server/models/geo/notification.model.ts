import { model, Schema } from 'mongoose';
import { RecordSchema } from '../utils.model';
import { ModelName } from '../model-name.enum';
import { Notification, NotificationSubject } from '@/types/notification.types';
import { GroundRerservationStatus } from '@/types/item/ground.types';

const NewGroundReservationNotificationPayloadSchema = {
	groundReservation: {
		type: Schema.Types.ObjectId,
		ref: ModelName.GROUND_RESERVATION,
		required: true,
	},
};

const GroundReservationStatusChangeNotificationPayloadSchema = {
	status: {
		type: String,
		enum: Object.values(GroundRerservationStatus),
		required: true,
	},
};

const NotificationPayloadSchema = {
	new_ground_reservation: NewGroundReservationNotificationPayloadSchema,
	reservation_status_change:
		GroundReservationStatusChangeNotificationPayloadSchema,
};

export const NotificationSchema = new Schema<Notification>({
	...RecordSchema,
	subject: {
		type: String,
		enum: Object.values(NotificationSubject),
		required: true,
	},
	payload: NotificationPayloadSchema,
	user: {
		type: Schema.Types.ObjectId,
		ref: ModelName.USER,
		required: true,
	},
	read: { type: Boolean, default: false },
	createdAt: { type: Number, required: true },
});

export const NotificationModel = model<Notification>(
	ModelName.NOTIFICATION,
	NotificationSchema
);
