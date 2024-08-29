import { Schema } from 'mongoose';
import { ModelName } from './model-name.enum';

export const RecordSchema = {
	// id: { type: String },

	createdAt: { type: Number, default: Date.now },
	updatedAt: { type: Number },
	deletedAt: { type: Number },

	createdBy: {
		type: Schema.Types.ObjectId,
		ref: ModelName.User,
	},
	updatedBy: {
		type: Schema.Types.ObjectId,
		ref: ModelName.User,
	},
	deletedBy: {
		type: Schema.Types.ObjectId,
		ref: ModelName.User,
	},
};
