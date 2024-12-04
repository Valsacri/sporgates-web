import GroundImages from '@/components/ground/details/GroundImages';
import GroundInfo from '@/components/ground/details/GroundInfo';
import GroundAddress from '@/components/ground/details/GroundAddress';
import Reviews from '@/components/shared/Reviews';
import GroundOpeningHours from '@/components/ground/details/GroundOpeningHours';
import GroundReservation from '@/components/ground/details/GroundReservation';
import { GroundServerService } from '@/server/services/ground.server-service';
import { Ground } from '@/types/item/ground/ground.types';
import Button from '@/components/utils/Button';
import { redirect } from 'next/navigation';
import { Address } from '@/types/geo.types';
import { User } from '@/types/user.types';
import { RatingStats, ReviewTopicType } from '@/types/review.types';
import { ReviewServerService } from '@/server/services/review.server-service';
import GroundForm from '@/components/ground/manage/GroundForm';
import { Popup } from '@/components/utils/Popup';
import Card from '@/components/utils/Card';

interface Props {
	params: {
		groundId: string;
	};
}

async function GroundDetails({ params: { groundId } }: Props) {
	let ground: Ground;
	let rating: RatingStats;

	try {
		const _ground = await GroundServerService.getOne(groundId);
		const _rating = await ReviewServerService.getRating(
			ReviewTopicType.GROUND,
			groundId
		);

		if (!_ground) {
			return <div>Ground not found</div>;
		}

		ground = _ground;
		rating = _rating;
	} catch (error) {
		console.error(error);
		return redirect('server-error');
	}

	return (
		<div className='space-y-3'>
			<GroundImages images={ground.images} />

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-3'>
				<div className='space-y-3 col-span-2'>
					<GroundInfo ground={ground} rating={rating} />
					{/* <GroundPricing subscriptions={ground.subscriptions} /> */}
					<Card title='Address' >
						<GroundAddress address={ground.address as Address} />
					</Card>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
						<div className='h-min'>
							<Reviews
								topicType={ReviewTopicType.GROUND}
								topic={ground.id}
								reviews={[
									{
										id: '',
										createdAt: new Date().getTime(),
										createdBy: {
											username: 'John Doe',
											name: 'John Doe',
										} as User,
										rating: 5,
										comment: 'Great place to play football',
										topicType: ReviewTopicType.GROUND,
										topic: ground,
									},
									{
										id: '',
										createdAt: new Date().getTime(),
										createdBy: {
											username: 'John Doe',
											name: 'John Doe',
										} as User,
										rating: 4,
										comment: 'Nice place',
										topicType: ReviewTopicType.GROUND,
										topic: ground,
									},
								]}
							/>
						</div>
						<GroundOpeningHours openingHours={ground.openingHours} />
					</div>
				</div>

				<GroundReservation ground={ground} />
			</div>

			<Popup
				title='Update ground'
				description='Update the details of the ground.'
				trigger={
					<Button
						icon='edit'
						color='primary'
						className='fixed bottom-5 right-5 p-7 rounded-full'
						iconClassName='!size-8'
					></Button>
				}
			>
				<GroundForm ground={ground} businessId={ground.business as string} />
			</Popup>
		</div>
	);
}

export default GroundDetails;
