import { Socials } from '@/types/general.types';
import { User } from '@/types/user.types';
import mongoose, { Model, Schema } from 'mongoose';
import { AddressSchema } from './general.model';
import { RecordSchema } from './utils.model';

export const SocialsSchema = new Schema<Socials>(
	{
		facebook: { type: String, default: null },
		x: { type: String, default: null },
		instagram: { type: String, default: null },
		linkedin: { type: String, default: null },
		tiktok: { type: String, default: null },
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

	username: { type: String, default: null },
	phoneNumber: { type: String, default: null },
	avatar: { type: String, default: null },
	cover: { type: String, default: null },
	bio: { type: String, default: '' },
	birthday: { type: String, default: null },
	address: { type: AddressSchema, default: null },
	socials: { type: SocialsSchema, default: null },

	verifiedAt: { type: Number, default: null },
});

export const UserModel =
	(mongoose.models.User as Model<User>) ||
	mongoose.model<User>('User', UserSchema);
