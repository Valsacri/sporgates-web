'use client';

import Rating from '@/components/shared/Rating';
import ReviewFormPopup from '@/components/shared/ReviewPopup';
import Button from '@/components/utils/Button';
import Card from '@/components/utils/Card';
import { Review, ReviewTopicType } from '@/types/review.types';
import { User } from '@/types/user.types';
import PopupManager from '../utils/PopupManager';
import { useFetch } from '@/client/hooks/utils/useFetch';
import { ReviewClientService } from '@/client/services/geo/review.client-service';
import Loader from '../utils/Loader';

interface Props {
	topicType: ReviewTopicType;
	topic: string;
	reviews: Review[];
}

function Reviews({ topicType, topic }: Props) {
	const {
		data: [reviews, rating],
		refetch,
		loading,
	} = useFetch([[], { count: 0, avgRating: 0 }], {
		async fetch() {
			const [reviews, rating] = await Promise.all([
				ReviewClientService.getPage(topicType, topic),
				ReviewClientService.getRating(topicType, topic),
			]);
			return [reviews, rating];
		},
	});

	return (
		<Card>
			<div className='flex justify-between mb-5'>
				<h2 className='mb-2'>Reviews</h2>
				<div className='flex gap-3'>
					<div>
						<Rating value={rating.avgRating} />
						<p className='text-xs text-text-secondary text-end'>
							{rating.count} reviews
						</p>
					</div>
					<h1 className='text-3xl'>{rating.avgRating}</h1>
				</div>
			</div>

			{loading ? (
				<Loader className='size-10 mx-auto mb-5' />
			) : (
				reviews.map((review, i) => (
					<div key={i} className='mb-4'>
						<div className='flex justify-between'>
							<h4>{(review.createdBy as User).name}</h4>
							<p className='text-xs text-text-secondary'>2 days ago</p>
						</div>
						<Rating value={review.rating} />
						<p className='text-sm mt-2'>{review.comment}</p>
						{i < reviews.length - 1 && <hr className='mt-3' />}
					</div>
				))
			)}

			<PopupManager
				trigger={
					<Button className='w-full' color='primary'>
						Write a review
					</Button>
				}
				triggerClassName='h-min'
				popup={
					<ReviewFormPopup
						topicType={topicType}
						topic={topic}
						onSubmit={refetch}
					/>
				}
			/>
		</Card>
	);
}

export default Reviews;
