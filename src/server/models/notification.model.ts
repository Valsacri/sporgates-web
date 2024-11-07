import { Model, Schema } from 'mongoose';
import { RecordSchema } from './utils.model';
import { ModelName } from './model-name.enum';
import { Notification, NotificationSubject } from '@/types/notification.types';
import mongoose from 'mongoose';

export const NotificationSchema = new Schema<Notification>({
	...RecordSchema,
	subject: {
		type: String,
		enum: Object.values(NotificationSubject),
		required: true,
	},
	title: { type: String, required: true },
	description: { type: String, required: true },
	image: { type: String },
	user: {
		type: Schema.Types.ObjectId,
		ref: ModelName.USER,
		required: true,
	},
	infos: { type: [String] },
	read: { type: Boolean, default: false },
	url: { type: String },
});

export const NotificationModel =
	(mongoose.models.Notification as Model<Notification>) ||
	mongoose.model<Notification>(ModelName.NOTIFICATION, NotificationSchema);
