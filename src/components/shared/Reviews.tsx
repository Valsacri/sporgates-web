import Rating from '@/components/shared/Rating';
import ReviewForm from '@/components/shared/ReviewForm';
import Button from '@/components/utils/Button';
import Card from '@/components/utils/Card';
import { RatingStats, Review, ReviewTopicType } from '@/types/review.types';
import { User } from '@/types/user.types';
import { ReviewClientService } from '@/client/services/geo/review.client-service';
import Loader from '../utils/Loader';
import { Popup } from '../utils/Popup';
import { ReviewServerService } from '@/server/services/review.server-service';
import { redirect } from 'next/navigation';
import { DateHelper } from '@/helpers/datetime/date.helpers';
import { useEffect } from 'react';
import { useFetch } from '@/client/hooks/utils/useFetch';
import useCitiesAndTownsOptions from '@/client/hooks/useCitiesAndTownsOptions';

interface Props {
	topicType: ReviewTopicType;
	topic: string;
	reviews: Review[];
}

async function Reviews({ topicType, topic }: Props) {
	// const {
	// 	data: [reviews, rating],
	// 	refetch,
	// 	loading,
	// } = useFetch([[], { count: 0, avgRating: 0 }], {
	// 	async fetch() {
	// 		const [reviews, rating] = await Promise.all([
	// 			ReviewClientService.getPage(topicType, topic),
	// 			ReviewClientService.getRating(topicType, topic),
	// 		]);
	// 		return [reviews, rating];
	// 	},
	// });

	let reviews: Review[] = [];
	let rating: RatingStats = { avgRating: 0, count: 0 };

	try {
		const [_reviews, _rating] = await Promise.all([
			ReviewServerService.getPage(topicType, topic),
			ReviewServerService.getRating(topicType, topic),
		]);

		reviews = _reviews;
		rating = _rating;
	} catch (error) {
		console.error(error);
		return redirect('server-error');
	}

	const handleSubmit = async () => {
		// await refetch();
	};

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

			{false ? (
				<Loader className='size-10 mx-auto mb-5' />
			) : (
				reviews.map((review, i) => (
					<div key={i} className='mb-4'>
						<div className='flex justify-between'>
							<h4>{(review.createdBy as User).name}</h4>
							<p className='text-xs text-text-secondary'>
								{DateHelper.toElapsedTime(new Date(review.createdAt))}
							</p>
						</div>
						<Rating value={review.rating} />
						<p className='text-sm text-text-secondary-dark mt-2'>
							{review.comment}
						</p>
						{i < reviews.length - 1 && <hr className='mt-3' />}
					</div>
				))
			)}

			<Popup
				trigger={
					<Button className='w-full' color='primary'>
						Write a review
					</Button>
				}
				title='Post a review'
				className='lg:w-[400px]'
			>
				<ReviewForm
					topicType={topicType}
					topic={topic}
					// onSubmit={handleSubmit}
				/>
			</Popup>
		</Card>
	);
}

export default Reviews;
