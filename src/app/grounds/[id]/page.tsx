'use client';

import { GROUNDS } from '@/data/grounds';
import GroundImages from '@/components/ground/details/GroundImages';
import GroundInfo from '@/components/ground/details/GroundInfo';
import GroundPricing from '@/components/ground/details/GroundPricing';
import GroundAddress from '@/components/ground/details/GroundAddress';
import GroundReviews from '@/components/ground/details/GroundReviews';
import GroundOpeningHours from '@/components/ground/details/GroundOpeningHours';
import GroundReservation from '@/components/ground/details/GroundReservation';

interface Props {
	params: {
		id: string;
	};
}

function GroundDetails({ params: { id } }: Props) {
	const ground = GROUNDS.find((ground) => ground.id.toString() === id)!;

	return (
		<>
			<GroundImages images={ground.images} />
			<div className='grid grid-cols-3 gap-5'>
				<div className='space-y-5 col-span-2 pt-5'>
					<GroundInfo ground={ground} />
					<GroundPricing prices={ground.prices} />
					<GroundAddress address={ground.address} />
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
						<GroundReviews
							reviews={ground.reviews}
							avgRating={ground.avgRating}
						/>
						<GroundOpeningHours openingHours={ground.openingHours} />
					</div>
				</div>

				<div className='sticky top-0 h-max pt-5'>
					<GroundReservation />
				</div>
			</div>
		</>
	);
}

export default GroundDetails;
