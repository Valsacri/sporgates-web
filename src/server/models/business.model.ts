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
	bio: { type: String, required: true },
	avatar: { type: String, required: true },
	cover: { type: String, required: true },
	socials: { type: SocialsSchema, required: true },

	owner: { type: Schema.Types.ObjectId, ref: ModelName.USER, required: true },
	staff: [{ type: Schema.Types.ObjectId, ref: ModelName.USER }],

	email: { type: String, required: true },
	phoneNumber: { type: String, required: true },
	address: { type: AddressSchema, required: true },
});

export const BusinessModel =
	(mongoose.models.Business as Model<Business>) ||
	mongoose.model<Business>(ModelName.BUSINESS, BusinessSchema);
