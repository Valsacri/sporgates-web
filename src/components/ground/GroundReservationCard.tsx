import { GroundReservation } from '@/types/item/ground.types';
import Card from '../utils/Card';

interface Props {
	reservation: GroundReservation;
}

function GroundReservationCard({ reservation }: Props) {
	return (
		<Card>
			<div className='flex items-center justify-between'>
				<div>
					<h3 className='text-lg font-semibold'>Ground Name</h3>
					<p className='text-sm text-gray-500'>City, Neighborhood</p>
				</div>
				<div>
					<p className='text-sm text-gray-500'>Date</p>
					<p className='text-sm text-gray-500'>Time</p>
				</div>
			</div>
			<div className='flex items-center justify-between'>
				<p className='text-sm text-gray-500'>Total Price</p>
				<p className='text-sm text-gray-500'>Status</p>
			</div>
		</Card>
	);
}

export default GroundReservationCard;
