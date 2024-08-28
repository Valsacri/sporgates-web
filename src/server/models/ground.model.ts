import { Ground } from '@/types/item/ground.types';
import mongoose, { Model, Schema } from 'mongoose';
import {
	AddressSchema,
	OpeningHoursSchema,
	ReviewSchema,
} from './general.model';
import { Subscription } from '@/types/item/club.types';
import { RecordSchema } from './utils.model';

const SubscriptionPeriodSchema = new Schema(
	{
		duration: { type: String, required: true },
		amount: { type: Number, required: true },
	},
	{ _id: false }
);

const SubscriptionFeatureSchema = new Schema(
	{
		description: { type: String, required: true },
	},
	{ _id: false }
);

const SubscriptionDiscountSchema = new Schema(
	{
		amount: { type: Number, required: true },
		endDate: { type: String },
	},
	{ _id: false }
);

const SubscriptionSchema = new Schema<Subscription>(
	{
		name: { type: String, required: true },
		description: { type: String },
		features: { type: [SubscriptionFeatureSchema], required: true },
		price: { type: Number, required: true },
		period: SubscriptionPeriodSchema,
		discount: { type: SubscriptionDiscountSchema },
		isHighlighted: { type: Boolean, default: false },
	},
	{ _id: false }
);

const GroundSchema = new Schema<Ground>({
	...RecordSchema,
	name: { type: String, required: true },
	description: { type: String },
	address: { type: AddressSchema, required: true },
	images: { type: [String], required: true },
	avgRating: { type: Number, default: 0 },
	reviews: { type: [ReviewSchema], required: true },
	openingHours: { type: OpeningHoursSchema, required: true },

	minReservationTime: { type: Number, required: true },
	price: { type: Number, required: true },
	busyHours: { type: [Date], required: true },
	subscriptions: { type: [SubscriptionSchema], required: true },
});

export const GroundModel =
	(mongoose.models.Ground as Model<Ground>) ||
	mongoose.model<Ground>('Ground', GroundSchema);
