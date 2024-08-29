import { Socials } from '@/types/general.types';
import { User } from '@/types/user.types';
import mongoose, { Model, Schema } from 'mongoose';
import { AddressSchema } from './general.model';
import { RecordSchema } from './utils.model';
import { ModelName } from './model-name.enum';

export const SocialsSchema = new Schema<Socials>(
	{
		facebook: { type: String },
		x: { type: String },
		instagram: { type: String },
		linkedin: { type: String },
		tiktok: { type: String },
	},
	{ _id: false }
);

export const UserSchema = new Schema<User>({
	...RecordSchema,
	uid: { type: String, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	role: { type: String, required: true },

	username: { type: String },
	phoneNumber: { type: String },
	avatar: { type: String },
	cover: { type: String },
	bio: { type: String, default: '' },
	birthday: { type: String },
	address: { type: AddressSchema },
	socials: { type: SocialsSchema },

	verifiedAt: { type: Number },
});

export const UserModel =
	(mongoose.models.User as Model<User>) ||
	mongoose.model<User>(ModelName.User, UserSchema);
