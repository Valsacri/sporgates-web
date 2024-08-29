import { OpeningHours } from '@/types/business.types';
import {
	Address,
	DateTimeframes,
	Review,
	Timeframe,
} from '@/types/general.types';
import { Schema } from 'mongoose';
import { RecordSchema } from './utils.model';
import { ModelName } from './model-name.enum';

export const AddressSchema = new Schema<Address>(
	{
		country: { type: String },
		city: { type: String, required: true },
		neighborhood: { type: String, required: true },
		street: { type: String },
		zip: { type: String },
		geoLocation: {
			lat: { type: Number, required: true },
			lng: { type: Number, required: true },
		},
	},
	{ _id: false }
);

export const ReviewSchema = new Schema<Review>({
	...RecordSchema,
	user: { type: Schema.Types.ObjectId, ref: ModelName.User, required: true },
	rating: { type: Number, required: true },
	comment: { type: String, required: true },
});

export const TimeframeSchema = new Schema<Timeframe>(
	{
		from: {
			hours: { type: Number, required: true },
			minutes: { type: Number, required: true },
		},
		to: {
			hours: { type: Number, required: true },
			minutes: { type: Number, required: true },
		},
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
