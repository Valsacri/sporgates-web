import mongoose, { Model, Schema } from 'mongoose';
import { RecordSchema } from './utils.model';
import { ModelName } from './model-name.enum';
import { AddressSchema, TimeframeSchema } from './general.model';
import { Business, OpeningHours } from '@/types/business.types';

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

const ContactSchema = new Schema({
	emails: [{ type: String, required: true }],
	phones: [{ type: String, required: true }],
	address: { type: AddressSchema },
});

const BusinessSchema = new Schema<Business>({
	...RecordSchema,

	name: { type: String, required: true },
	username: { type: String, required: true, unique: true },

	owner: { type: Schema.Types.ObjectId, ref: ModelName.USER, required: true },
	staff: [{ type: Schema.Types.ObjectId, ref: ModelName.USER, required: true }],

	bio: { type: String },
	avatar: { type: String },
	cover: { type: String },

	contact: { type: ContactSchema },

	verifiedAt: { type: Number },
	lastUsernameChangeAt: { type: Number },
});

export const BusinessModel =
	(mongoose.models.Business as Model<Business>) ||
	mongoose.model<Business>(ModelName.BUSINESS, BusinessSchema);
