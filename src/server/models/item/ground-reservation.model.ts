import {
	GroundRerservationStatus,
	GroundReservation,
} from '@/types/item/ground.types';
import mongoose, { Schema } from 'mongoose';
import { DateTimeframesSchema } from '../general.model';
import { Model } from 'mongoose';
import { ModelName } from '../model-name.enum';
import { RecordSchema } from '../utils.model';

const GroundReservationSchema = new Schema<GroundReservation>({
	...RecordSchema,
	ground: {
		type: Schema.Types.ObjectId,
		ref: ModelName.Ground,
		required: true,
	},
	user: { type: Schema.Types.ObjectId, ref: ModelName.User, required: true },
	dateTimeframes: { type: DateTimeframesSchema, required: true },
	totalPrice: { type: Number, required: true },
	status: {
		type: String,
		enum: Object.values(GroundRerservationStatus),
		default: GroundRerservationStatus.PENDING,
	},
});

export const GroundReservationModel =
	(mongoose.models.GroundReservation as Model<GroundReservation>) ||
	mongoose.model<GroundReservation>(
		ModelName.GroundReservation,
		GroundReservationSchema
	);
