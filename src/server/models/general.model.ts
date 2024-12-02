import {
	DateTimeframes,
	Review,
	Socials,
	Timeframe,
} from '@/types/general.types';
import { HydratedDocument, Schema } from 'mongoose';
import { RecordSchema } from './utils.model';
import { ModelName } from './model-name.enum';

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

const validate = {
	validator(this: HydratedDocument<Review>) {
		return !!(this.user || this.ground || this.club);
	},
	message: "At least one of 'user', 'ground', or 'club' must be provided.",
};

export const ReviewSchema = new Schema<Review>({
	...RecordSchema,
	rating: { type: Number, required: true },
	comment: { type: String, required: true },
	user: {
		type: Schema.Types.ObjectId,
		ref: ModelName.USER,
		validate,
	},
	ground: {
		type: Schema.Types.ObjectId,
		ref: ModelName.GROUND,
		validate,
	},
	club: {
		type: Schema.Types.ObjectId,
		ref: ModelName.CLUB,
		validate,
	},
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
