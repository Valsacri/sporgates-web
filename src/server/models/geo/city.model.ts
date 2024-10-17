import mongoose, { Model, Schema } from 'mongoose';
import { RecordSchema } from '../utils.model';
import { ModelName } from '../model-name.enum';
import { City } from '@/types/geo.types';

const CitySchema = new Schema<City>({
	...RecordSchema,
	name: {
		type: String,
		required: true,
	},
});

export const CityModel =
	(mongoose.models.City as Model<City>) ||
	mongoose.model<City>(ModelName.City, CitySchema);
