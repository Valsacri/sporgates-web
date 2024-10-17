import mongoose, { Model, Schema } from 'mongoose';
import { RecordSchema } from '../utils.model';
import { ModelName } from '../model-name.enum';
import { Town } from '@/types/geo.types';

const TownSchema = new Schema<Town>({
	...RecordSchema,
	name: { type: String, required: true },
	city: {
		type: Schema.Types.ObjectId,
		ref: ModelName.City,
	},
});

export const TownModel =
	(mongoose.models.Town as Model<Town>) ||
	mongoose.model<Town>(ModelName.Town, TownSchema);
