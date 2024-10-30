import mongoose, { Model, Schema } from 'mongoose';
import { RecordSchema } from './utils.model';
import { ModelName } from './model-name.enum';
import { AddressSchema, SocialsSchema } from './general.model';
import { Business } from '@/types/business.types';

const BusinessSchema = new Schema<Business>({
	...RecordSchema,

	name: { type: String, required: true },
	username: { type: String, required: true, unique: true },
	description: { type: String, required: true },
	slogan: { type: String, required: true },
	logo: { type: String, required: true },
	socials: { type: SocialsSchema, required: true },

	owner: { type: Schema.Types.ObjectId, ref: ModelName.User, required: true },
	staff: [{ type: Schema.Types.ObjectId, ref: ModelName.User }],

	email: { type: String, required: true },
	phoneNumber: { type: String, required: true },
	address: { type: AddressSchema, required: true },
});

export const BusinessModel =
	(mongoose.models.Business as Model<Business>) ||
	mongoose.model<Business>(ModelName.Business, BusinessSchema);
