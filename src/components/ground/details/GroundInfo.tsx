import Card from '@/components/utils/Card';
import Rating from '@/components/shared/Rating';
import { Ground } from '@/types/item/ground.types';

interface Props {
	ground: Ground;
}

function GroundInfo({ ground }: Props) {
	return (
		<Card className='space-y-6'>
			<div className='flex justify-between'>
				<div>
					<h1>{ground.name}</h1>
					<div className='flex items-center gap-1 mt-2'>
						<Rating rating={ground.avgRating} />
						<span className='text-xs font-light'>
							| {ground.reviews.length} reviews
						</span>
					</div>
				</div>
			</div>
			<div>
				<h2 className='text-lg font-medium'>Description</h2>
				<p>{ground.description}</p>
				<p>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex
					praesentium cupiditate sit cum debitis quidem natus, voluptatibus eius
					sequi consequuntur, consequatur error deserunt placeat repudiandae
					dolore autem aliquid corporis odit?
				</p>
			</div>
		</Card>
	);
}

export default GroundInfo;
