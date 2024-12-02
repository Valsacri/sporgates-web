import { Address } from '@/types/geo.types';
import mongoose, { Model, Schema } from 'mongoose';
import { ModelName } from '../model-name.enum';
import { RecordSchema } from '../utils.model';

export const AddressSchema = new Schema<Address>({
	...RecordSchema,

	label: { type: String },
	city: {
		type: Schema.Types.ObjectId,
		ref: ModelName.CITY,
		required: true,
	},
	town: {
		type: Schema.Types.ObjectId,
		ref: ModelName.TOWN,
		required: true,
	},
	street: { type: String },
	zip: { type: String },
	geoLocation: {
		lat: { type: Number, required: true },
		lng: { type: Number, required: true },
	},

  user: {
    type: Schema.Types.ObjectId,
    ref: ModelName.USER,
  },
  business: {
    type: Schema.Types.ObjectId,
    ref: ModelName.BUSINESS,
  },
});

AddressSchema.index({ geoLocation: '2dsphere' });

export const AddressModel =
	(mongoose.models.Address as Model<Address>) ||
	mongoose.model<Address>(ModelName.ADDRESS, AddressSchema);
