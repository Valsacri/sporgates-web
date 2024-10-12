import mongoose, { Schema, Model } from 'mongoose';
import { ModelName } from '../model-name.enum';
import {
  Transaction,
  TransactionStatus,
  TransactionType,
  TransactionSubject,
} from '@/types/wallet.types';

const TransactionSchema = new Schema<Transaction>({
	ref: { type: String, required: true },
	amount: { type: Number, required: true },
	type: {
		type: String,
		enum: Object.values(TransactionType),
		required: true,
	},
	subject: {
		type: String,
		enum: Object.values(TransactionSubject),
		required: true,
	},
	status: {
		type: String,
		enum: Object.values(TransactionStatus),
		default: TransactionStatus.PENDING,
	},
	sender: {
		type: Schema.Types.ObjectId,
		ref: ModelName.Wallet,
		required: true,
	},
	receiver: {
		type: Schema.Types.ObjectId,
		ref: ModelName.Wallet,
		default: null,
	},
});

export const TransactionModel =
	(mongoose.models.Transaction as Model<Transaction>) ||
	mongoose.model<Transaction>(ModelName.Transaction, TransactionSchema);
