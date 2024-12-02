import { Schema } from 'mongoose';
import { ModelName } from '../model-name.enum';
import { OpeningHoursSchema } from '../business.model';

export const ItemSchema = {
	name: { type: String, required: true },
	description: { type: String },
	images: { type: [String], required: true },
	openingHours: { type: OpeningHoursSchema, required: true },
	avgRating: { type: Number, default: 0 },
	business: {
		type: Schema.Types.ObjectId,
		ref: ModelName.BUSINESS,
		required: true,
	},
};
