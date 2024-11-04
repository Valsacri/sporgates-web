import mongoose, { Schema } from 'mongoose';
import { TimeframeSchema } from '../general.model';
import { Model } from 'mongoose';
import { ModelName } from '../model-name.enum';
import { RecordSchema } from '../utils.model';
import { GroundModel } from './ground.model';
import { GroundRerservationStatus, GroundReservation } from '@/types/item/ground/ground-reservation.types';

const GroundReservationSchema = new Schema<GroundReservation>({
	...RecordSchema,
	ref: { type: String, required: true },
	business: {
		type: Schema.Types.ObjectId,
		ref: ModelName.BUSINESS,
		required: true,
	},
	ground: {
		type: Schema.Types.ObjectId,
		ref: GroundModel.modelName,
		required: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: ModelName.USER,
		required: true,
	},
	date: { type: Number, required: true },
	timeframe: { type: TimeframeSchema, required: true },
	groundPrice: { type: Number, required: true },
	groundMinReservationTime: { type: Number, required: true },
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
		ModelName.GROUND_RESERVATION,
		GroundReservationSchema
	);
