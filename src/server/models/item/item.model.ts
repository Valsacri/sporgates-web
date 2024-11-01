import { Schema } from 'mongoose';
import {
	AddressSchema,
	OpeningHoursSchema,
	ReviewSchema,
} from '../general.model';
import { ModelName } from '../model-name.enum';

export const ItemSchema = {
	name: { type: String, required: true },
	description: { type: String },
	address: { type: AddressSchema, required: true },
	images: { type: [String], required: true },
	avgRating: { type: Number, default: 0 },
	reviews: { type: [ReviewSchema], required: true },
	openingHours: { type: OpeningHoursSchema, required: true },
	business: {
		type: Schema.Types.ObjectId,
		ref: ModelName.BUSINESS,
		required: true,
	},
};
