'use client';

import { GroundReservationContext } from '@/client/contexts/ground-reservation.context';
import ReservationPickerDesktop from '@/components/shared/ReservationPickerDesktop';
import Button from '@/components/utils/Button';
import Card from '@/components/utils/Card';
import { useContext } from 'react';

function GroundReservationDesktop() {
	const { ground, selectedTimes } = useContext(GroundReservationContext);

	return (
		<Card className='sticky top-0 left-0 w-full h-max pt-5'>
			<ReservationPickerDesktop />

			<div className='flex justify-between items-center my-3'>
				<h5>Price per hour</h5>
				<p className='text-success'>{ground.price} dh</p>
			</div>

			<Button icon='check' color='primary' className='w-full'>
				Reserve now{' '}
				{selectedTimes.length > 0 &&
					`for ${selectedTimes.length * ground.price} dh`}
			</Button>
		</Card>
	);
}

export default GroundReservationDesktop;
