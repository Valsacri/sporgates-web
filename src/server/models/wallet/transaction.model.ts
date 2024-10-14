import mongoose, { Schema, Model } from 'mongoose';
import { ModelName } from '../model-name.enum';
import { Transaction, TransactionSubject } from '@/types/wallet.types';
import { RecordSchema } from '../utils.model';

const TransactionSchema = new Schema<Transaction>({
	...RecordSchema,
	amount: { type: Number, required: true },
	subject: {
		type: String,
		enum: Object.values(TransactionSubject),
		required: true,
	},
	sender: {
		type: Schema.Types.ObjectId,
		ref: ModelName.Wallet,
	},
	receiver: {
		type: Schema.Types.ObjectId,
		ref: ModelName.Wallet,
	},
	refundGroundReservation: {
		type: Schema.Types.ObjectId,
		ref: ModelName.GroundReservation,
	},
	refundClubSubscription: {
		type: Schema.Types.ObjectId,
		ref: ModelName.ClubSubscription,
	},
});

export const TransactionModel =
	(mongoose.models.Transaction as Model<Transaction>) ||
	mongoose.model<Transaction>(ModelName.Transaction, TransactionSchema);
