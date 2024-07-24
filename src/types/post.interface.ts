export type PostSubject =
	| 'new-post'
	| 'share-post'
	| 'new-offer'
	| 'new-product'
	| 'new-event'
	| 'donation-request'
	| 'update-profile-photo';

export type OfferType = 'amount' | 'percentage';

export interface IPost {
	id: string;
	title: string;
	subject: PostSubject;
	date: string;
	body: string;
	isPromoted: boolean;
	image: string;
	offer?: {
		originalPrice: number;
		discount: number;
		disountType: OfferType;
		endDate: string;
	};
}
