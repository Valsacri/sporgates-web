import { Offer } from './item/item.types';
import { Record } from './utils.types';

export enum PostSubject {
	NEW_POST = 'new_post',
	SHARE_POST = 'share_post',
	NEW_OFFER = 'new_offer',
	NEW_PRODUCT = 'new_product',
	NEW_EVENT = 'new_event',
	DONATION_REQUEST = 'donation_request',
	UPDATE_PROFILE_PHOTO = 'update_profile_photo',
}

export interface Post extends Record {
	title: string;
	subject: PostSubject;
	date: string;
	body: string;
	isPromoted: boolean;
	image: string;
	offer?: Offer;
}
