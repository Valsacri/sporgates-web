import { Schema } from 'mongoose';

export const RecordSchema = {
	createdAt: { type: Number, default: null },
	updatedAt: { type: Number, default: null },
	deletedAt: { type: Number, default: null },

	createdBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
	updatedBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
	deletedBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
};
