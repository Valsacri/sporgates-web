import Card from '@/components/utils/Card';
import Rating from '@/components/shared/Rating';
import { Ground } from '@/types/item/ground/ground.types';
import { Popup } from '@/components/utils/Popup';
import Button from '@/components/utils/Button';
import GroundForm from '../manage/GroundForm';
import UserGuard from '@/components/utils/UserGuard';

interface Props {
	ground: Ground;
}

function GroundInfo({ ground }: Props) {
	return (
		<Card bodyClassName='space-y-3'>
			<div className='flex justify-between'>
				<div>
					<h1>{ground.name}</h1>
					<div className='flex items-center gap-1 mt-1'>
						<Rating value={ground.rating!.avgRating} />
						<span className='text-xs font-light'>| {ground.rating!.count} reviews</span>
					</div>
				</div>

				<UserGuard>
					<Popup
						title='Update ground'
						description='Update the details of the ground.'
						trigger={<Button icon='edit'></Button>}
					>
						<GroundForm
							ground={ground}
							businessId={ground.business as string}
						/>
					</Popup>
				</UserGuard>
			</div>

			<div>
				<h3 className='font-medium'>Description</h3>
				<p className='text-text-secondary-dark'>{ground.description}</p>
			</div>
		</Card>
	);
}

export default GroundInfo;
