import { User } from '@/types/user.types';
import mongoose, { Model, Schema } from 'mongoose';
import { AddressSchema, SocialsSchema } from './general.model';
import { RecordSchema } from './utils.model';
import { ModelName } from './model-name.enum';

export const UserSchema = new Schema<User>({
	...RecordSchema,
	uid: { type: String, required: true, unique: true },
	username: { type: String, required: true, unique: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	sports: [{ type: Schema.Types.ObjectId, ref: ModelName.SPORT }],

	avatar: { type: String },
	cover: { type: String },
	bio: { type: String, default: '' },

	phone: { type: String },
	birthday: { type: String },
	address: { type: AddressSchema },

	verifiedAt: { type: Number },
	lastUsernameChangeAt: { type: Number },
});

export const UserModel =
	(mongoose.models.User as Model<User>) ||
	mongoose.model<User>(ModelName.USER, UserSchema);
