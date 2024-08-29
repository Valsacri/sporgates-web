import GroundImages from '@/components/ground/details/GroundImages';
import GroundInfo from '@/components/ground/details/GroundInfo';
import GroundPricing from '@/components/ground/details/GroundPricing';
import GroundAddress from '@/components/ground/details/GroundAddress';
import GroundReviews from '@/components/ground/details/GroundReviews';
import GroundOpeningHours from '@/components/ground/details/GroundOpeningHours';
import GroundReservation from '@/components/ground/details/GroundReservation';
import { GroundServerService } from '@/server/services/ground.server-service';
import { Ground } from '@/types/item/ground.types';
import { Review } from '@/types/general.types';
import ManageGroundPopup from '@/components/ground/ManageGroundPopup';
import Button from '@/components/utils/Button';

interface Props {
	params: {
		id: string;
	};
}

async function GroundDetails({ params: { id } }: Props) {
	let ground: Ground;

	try {
		const _ground = await GroundServerService.getOne(id);

		if (!_ground) {
			return <div>Ground not found</div>;
		}

		ground = _ground;
	} catch (error) {
		console.error(error);
		return <div>Error</div>;
	}

	return (
		<>
			<GroundImages images={ground.images} />
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-5'>
				<div className='space-y-5 col-span-2 pt-5'>
					<GroundInfo ground={ground} />
					<GroundPricing subscriptions={ground.subscriptions} />
					<GroundAddress address={ground.address} />
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
						<GroundReviews
							reviews={ground.reviews as Review[]}
							avgRating={ground.avgRating}
						/>
						<GroundOpeningHours openingHours={ground.openingHours} />
					</div>
				</div>

				<GroundReservation ground={ground} />
			</div>

			<ManageGroundPopup ground={ground}>
				<Button
					icon='edit'
					color='primary'
					className='fixed bottom-5 right-5 p-7 rounded-full'
					iconClassName='!size-8'
				></Button>
			</ManageGroundPopup>
		</>
	);
}

export default GroundDetails;
