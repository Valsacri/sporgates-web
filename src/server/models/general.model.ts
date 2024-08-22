import { OpeningHours } from '@/types/business.types';
import { Address, Review, Timeframe } from '@/types/general.types';
import { Schema } from 'mongoose';
import { RecordSchema } from './utils.model';

export const AddressSchema: Schema = new Schema<Address>(
	{
		country: { type: String, required: true },
		city: { type: String, required: true },
		neighborhood: { type: String, required: true },
		street: { type: String, required: true },
		zip: { type: String, required: true },
		geoLocation: {
			lat: { type: Number, required: true },
			lng: { type: Number, required: true },
		},
	},
	{ _id: false }
);

export const ReviewSchema: Schema = new Schema<Review>({
	...RecordSchema,
	user: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
	rating: { type: Number, required: true },
	comment: { type: String, required: true },
});

export const TimeframeSchema: Schema = new Schema<Timeframe>(
	{
		from: { type: String, required: true },
		to: { type: String, required: true },
	},
	{ _id: false }
);

export const OpeningHoursSchema: Schema = new Schema<OpeningHours>(
	{
		monday: { type: TimeframeSchema, required: true },
		tuesday: { type: TimeframeSchema, required: true },
		wednesday: { type: TimeframeSchema, required: true },
		thursday: { type: TimeframeSchema, required: true },
		friday: { type: TimeframeSchema, required: true },
		saturday: { type: TimeframeSchema, required: true },
		sunday: { type: TimeframeSchema, required: true },
	},
	{ _id: false }
);
