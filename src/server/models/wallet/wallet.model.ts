import mongoose, { Schema, Model } from 'mongoose';
import { ModelName } from '../model-name.enum';
import { Wallet } from '@/types/wallet.types';

const WalletSchema = new Schema<Wallet>({
	user: { type: Schema.Types.ObjectId, ref: ModelName.User, required: true },
	balance: { type: String, required: true },
});

export const WalletModel =
	(mongoose.models.Wallet as Model<Wallet>) ||
	mongoose.model<Wallet>(ModelName.Wallet, WalletSchema);
