import mongoose, { Schema, Model } from 'mongoose';
import { ModelName } from '../model-name.enum';
import { Wallet } from '@/types/wallet.types';
import { RecordSchema } from '../utils.model';

const WalletSchema = new Schema<Wallet>({
	...RecordSchema,
	user: {
		type: Schema.Types.ObjectId,
		ref: ModelName.USER,
		required: true,
	},
	balance: { type: Number, required: true },
});

export const WalletModel =
	(mongoose.models.Wallet as Model<Wallet>) ||
	mongoose.model<Wallet>(ModelName.WALLET, WalletSchema);
