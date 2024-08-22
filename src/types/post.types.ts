import { Offer } from './item/item.types';
import { Record } from './utils.types';

export enum PostSubject {
	NewPost = 'new-post',
	SharePost = 'share-post',
	NewOffer = 'new-offer',
	NewProduct = 'new-product',
	NewEvent = 'new-event',
	DonationRequest = 'donation-request',
	UpdateProfilePhoto = 'update-profile-photo',
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
