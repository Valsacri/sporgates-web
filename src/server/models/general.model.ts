import {
	DateTimeframes,
	Review,
	Socials,
	Timeframe,
} from '@/types/general.types';
import { Schema } from 'mongoose';
import { RecordSchema } from './utils.model';
import { ModelName } from './model-name.enum';
import { Address } from '@/types/geo.types';
import { OpeningHours } from '@/types/business.types';

export const SocialsSchema = new Schema<Socials>(
	{
		instagram: { type: String },
		facebook: { type: String },
		x: { type: String },
		linkedin: { type: String },
		tiktok: { type: String },
		website: { type: String },
	},
	{ _id: false }
);

export const AddressSchema = new Schema<Address>(
	{
		city: {
			type: Schema.Types.ObjectId,
			ref: ModelName.CITY,

			required: true,
		},
		town: {
			type: Schema.Types.ObjectId,
			ref: ModelName.TOWN,

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

AddressSchema.index({ geoLocation: '2dsphere' });

export const ReviewSchema = new Schema<Review>({
	...RecordSchema,
	user: {
		type: Schema.Types.ObjectId,
		ref: ModelName.USER,

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