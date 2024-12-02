import { Review, ReviewTopicType } from '@/types/review.types';
import mongoose, { Model, Schema } from 'mongoose';
import { RecordSchema } from './utils.model';
import { ModelName } from './model-name.enum';

export const ReviewSchema = new Schema<Review>({
	...RecordSchema,
	rating: { type: Number, required: true },
	comment: { type: String, required: true },
	topicType: {
		type: String,
		required: true,
		enum: Object.values(ReviewTopicType),
	},
	topic: {
		type: Schema.Types.ObjectId,
		required: true,
		refPath: 'topicType',
	},
});

export const ReviewModel =
	(mongoose.models.Review as Model<Review>) ||
	mongoose.model<Review>(ModelName.REVIEW, ReviewSchema);
