'use client';

import ReservationPickerMobile from '@/components/shared/ReservationPickerMobile';
import Button from '@/components/utils/Button';
import Card from '@/components/utils/Card';
import { useContext } from 'react';
import { GroundReservationContext } from './GroundReservation';

function GroundReservationMobile() {
	const { ground, selectedTimes } = useContext(GroundReservationContext);

	return (
		<Card className='sticky bottom-0 left-0 w-full h-max z-50 border-t rounded-t-none'>
			<ReservationPickerMobile />

			<Button icon='check' color='primary' className='w-full mt-3'>
				Reserve now{' '}
				{selectedTimes.length > 0 &&
					`for ${selectedTimes.length * ground.price} dh`}
			</Button>
		</Card>
	);
}

export default GroundReservationMobile;
