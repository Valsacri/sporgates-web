import { Offer } from "./business.interface";

export enum PostSubject {
	NewPost = 'new-post',
	SharePost = 'share-post',
	NewOffer = 'new-offer',
	NewProduct = 'new-product',
	NewEvent = 'new-event',
	DonationRequest = 'donation-request',
	UpdateProfilePhoto = 'update-profile-photo'
}

export interface IPost {
	id: string;
	title: string;
	subject: PostSubject;
	date: string;
	body: string;
	isPromoted: boolean;
	image: string;
	offer?: string | Offer
}
