import { Ground } from '@/types/item/ground.types';
import mongoose, { Model, Schema } from 'mongoose';
import {
	AddressSchema,
	OpeningHoursSchema,
	ReviewSchema,
} from './general.model';
import { Subscription } from '@/types/item/club.types';
import { RecordSchema } from './utils.model';

const SubscriptionSchema = new Schema<Subscription>(
	{
		name: { type: String, required: true },
		description: { type: String, required: true },
		features: { type: [String], required: true },
		price: { type: Number, required: true },
		period: {
			duration: { type: String, required: true },
			amount: { type: Number, required: true },
		},
		discount: { type: Number, required: true },
		isDefault: { type: Boolean, required: true },
	},
	{ _id: false }
);

const GroundSchema = new Schema<Ground>({
	...RecordSchema,
	name: { type: String, required: true },
	description: { type: String, required: true },
	address: { type: AddressSchema, required: true },
	images: { type: [String], required: true },
	avgRating: { type: Number, required: true },
	reviews: { type: [ReviewSchema], required: true },
	openingHours: { type: OpeningHoursSchema, required: true },

	minReservationTime: { type: Number, required: true },
	price: { type: Number, required: true },
	busyHours: { type: [Date], required: true },
	subscriptions: [{ type: [SubscriptionSchema], required: true }],
});

export const GroundModel =
	(mongoose.models.Ground as Model<Ground>) ||
	mongoose.model<Ground>('Ground', GroundSchema);
