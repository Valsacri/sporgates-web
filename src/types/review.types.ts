import { ModelName } from '@/server/models/model-name.enum';
import { Ground } from './item/ground/ground.types';
import { Club } from './item/club.types';
import { Record } from './utils.types';

export enum ReviewTopicRoute {
	USER = 'users',
	GROUND = 'grounds',
	CLUB = 'clubs',
}

export enum ReviewTopicType {
	USER = ModelName.USER,
	GROUND = ModelName.GROUND,
	CLUB = ModelName.CLUB,
}

export interface RatingStats {
	avgRating: number;
	count: number;
}

export interface Review extends Record {
	rating: number;
	comment?: string;
	topicType: ReviewTopicType;
	topic: string | User | Ground | Club;
}
