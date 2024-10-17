import { OpeningHours } from '@/types/business.types';
import { DateTimeframes, Review, Timeframe } from '@/types/general.types';
import { Schema } from 'mongoose';
import { RecordSchema } from './utils.model';
import { ModelName } from './model-name.enum';
import { Address } from '@/types/geo.types';

export const AddressSchema = new Schema<Address>(
	{
		city: {
			type: Schema.Types.ObjectId,
			ref: ModelName.City,

			required: true,
		},
		town: {
			type: Schema.Types.ObjectId,
			ref: ModelName.Town,

			required: true,
		},
		street: { type: String },
		zip: { type: String },
		geoLocation: {
			lat: { type: Number, required: true },
			lng: { type: Number, required: true },
		},
	},
	{ _id: false, toObject: { getters: true }, toJSON: { getters: true } }
);

export const ReviewSchema = new Schema<Review>({
	...RecordSchema,
	user: {
		type: Schema.Types.ObjectId,
		ref: ModelName.User,

		required: true,
	},
	rating: { type: Number, required: true },
	comment: { type: String, required: true },
});

const TimeSchema = new Schema(
	{
		hours: { type: Number, required: true },
		minutes: { type: Number, required: true },
	},
	{ _id: false }
);

export const TimeframeSchema = new Schema<Timeframe>(
	{
		start: TimeSchema,
		end: TimeSchema,
	},
	{ _id: false }
);

export const DateTimeframesSchema = new Schema<DateTimeframes>(
	{
		date: { type: Number, required: true },
		timeframes: { type: [TimeframeSchema], required: true },
	},
	{ _id: false }
);

export const OpeningHoursSchema = new Schema<OpeningHours>(
	{
		monday: { type: [TimeframeSchema], required: true },
		tuesday: { type: [TimeframeSchema], required: true },
		wednesday: { type: [TimeframeSchema], required: true },
		thursday: { type: [TimeframeSchema], required: true },
		friday: { type: [TimeframeSchema], required: true },
		saturday: { type: [TimeframeSchema], required: true },
		sunday: { type: [TimeframeSchema], required: true },
	},
	{ _id: false }
);
