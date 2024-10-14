import mongoose, { Model, Schema } from 'mongoose';
import { Club, ClubSubscription } from '@/types/item/club.types';
import { RecordSchema } from '../utils.model';
import { ItemSchema } from './item.model';
import { ModelName } from '../model-name.enum';

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

export const SubscriptionSchema = new Schema<ClubSubscription>(
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

const ClubSchema = new Schema<Club>({
	...RecordSchema,
	...ItemSchema,

	subscriptions: { type: [SubscriptionSchema], required: true },
});

export const ClubModel =
	(mongoose.models.Club as Model<Club>) ||
	mongoose.model<Club>(ModelName.Club, ClubSchema);
