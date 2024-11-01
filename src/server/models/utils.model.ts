import { Schema } from 'mongoose';
import { ModelName } from './model-name.enum';

export const RecordSchema = {
	// id: { type: String },

	createdAt: { type: Number, default: Date.now },
	updatedAt: { type: Number },
	deletedAt: { type: Number },

	createdBy: {
		type: Schema.Types.ObjectId,
		ref: ModelName.USER,
	},
	updatedBy: {
		type: Schema.Types.ObjectId,
		ref: ModelName.USER,
	},
	deletedBy: {
		type: Schema.Types.ObjectId,
		ref: ModelName.USER,
	},
};
