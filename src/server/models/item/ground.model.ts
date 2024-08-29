import { Ground } from '@/types/item/ground.types';
import mongoose, { Model, Schema } from 'mongoose';
import { RecordSchema } from '../utils.model';
import { SubscriptionSchema } from './club.model';
import { ItemSchema } from './item.model';
import { ModelName } from '../model-name.enum';
import { DateTimeframesSchema } from '../general.model';

const GroundSchema = new Schema<Ground>({
	...RecordSchema,
	...ItemSchema,

	minReservationTime: { type: Number, required: true },
	price: { type: Number, required: true },
	busyHours: { type: [DateTimeframesSchema], required: true },
	subscriptions: { type: [SubscriptionSchema], required: true },
});

export const GroundModel =
	(mongoose.models.Ground as Model<Ground>) ||
	mongoose.model<Ground>(ModelName.Ground, GroundSchema);
