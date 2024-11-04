import Card from '@/components/utils/Card';
import Rating from '@/components/shared/Rating';
import { Ground } from '@/types/item/ground/ground.types';

interface Props {
	ground: Ground;
}

function GroundInfo({ ground }: Props) {
	return (
		<Card className='space-y-3'>
			<div className='flex justify-between'>
				<div>
					<h1>{ground.name}</h1>
					<div className='flex items-center gap-1 mt-1'>
						<Rating rating={ground.avgRating} />
						<span className='text-xs font-light'>
							| {ground.reviews.length} reviews
						</span>
					</div>
				</div>
			</div>
			<div>
				<h3 className='font-medium'>Description</h3>
				<p className='text-text-secondary-dark'>{ground.description}</p>
			</div>
		</Card>
	);
}

export default GroundInfo;
