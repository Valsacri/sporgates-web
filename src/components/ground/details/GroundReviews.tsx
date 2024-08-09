import Rating from '@/components/shared/Rating';
import Card from '@/components/utils/Card';
import { User } from '@/types/user.interface';

function GroundReviews({
	reviews,
	avgRating,
}: {
	reviews: any[];
	avgRating: number;
}) {
	return (
		<Card className='order-2 lg:order-1'>
			<div className='flex justify-between mb-5'>
				<h2 className='mb-2'>Reviews</h2>
				<div className='flex gap-3'>
					<div>
						<Rating rating={avgRating} />
						<p className='text-xs text-text-secondary text-end'>
							{reviews.length} reviews
						</p>
					</div>
					<h1 className='text-3xl'>4.7</h1>
				</div>
			</div>
			{reviews.map((review, i) => (
				<div key={i} className='mb-4'>
					<div className='flex justify-between'>
						<h4>{(review.user as User).username}</h4>
						<p className='text-xs text-text-secondary'>2 days ago</p>
					</div>
					<Rating rating={review.rating} />
					<p className='text-sm mt-2'>{review.comment}</p>
					<hr className='mt-3' />
				</div>
			))}
		</Card>
	);
}

export default GroundReviews;
