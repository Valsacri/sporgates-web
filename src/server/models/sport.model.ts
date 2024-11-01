import { Sport } from '@/types/sport.types';
import mongoose, { Model, Schema } from 'mongoose';
import { RecordSchema } from './utils.model';
import { ModelName } from './model-name.enum';

export const SportSchema = new Schema<Sport>({
	...RecordSchema,
	code: { type: String, required: true },
	name: { type: String, required: true },
	imageUrl: { type: String },
});

export const SportModel =
	(mongoose.models.Sport as Model<Sport>) ||
	mongoose.model<Sport>(ModelName.SPORT, SportSchema);
