import {
	DateTimeframes,
	Review,
	ReviewTopicType,
	Socials,
	Timeframe,
} from '@/types/general.types';
import { Schema } from 'mongoose';
import { RecordSchema } from './utils.model';

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
