import {
	AddressSchema,
	OpeningHoursSchema,
	ReviewSchema,
} from '../general.model';

export const ItemSchema = {
	name: { type: String, required: true },
	description: { type: String },
	address: { type: AddressSchema, required: true },
	images: { type: [String], required: true },
	avgRating: { type: Number, default: 0 },
	reviews: { type: [ReviewSchema], required: true },
	openingHours: { type: OpeningHoursSchema, required: true },
};
