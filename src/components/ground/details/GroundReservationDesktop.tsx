'use client';

import { GroundReservationContext } from '@/client/contexts/ground-reservation.context';
import { useReservation } from '@/client/hooks/useReservation';
import ReservationPickerDesktop from '@/components/shared/ReservationPickerDesktop';
import Button from '@/components/utils/Button';
import Card from '@/components/utils/Card';
import { useContext } from 'react';

function GroundReservationDesktop() {
	const { loading, handleReserve } = useReservation();

	const { ground, selectedTimeframe, totalPrice } = useContext(GroundReservationContext);

	return (
		<Card className='sticky top-0 left-0 w-full h-max pt-5'>
			<ReservationPickerDesktop />

			<div className='flex justify-between items-center my-3'>
				<h5>Price per hour</h5>
				<p className='text-success'>{ground.price} dh</p>
			</div>

			<Button
				icon={loading ? null : 'check'}
				color='primary'
				className='w-full'
				onClick={handleReserve}
				loading={loading}
			>
				Reserve now {selectedTimeframe && `for ${totalPrice} dh`}
			</Button>
		</Card>
	);
}

export default GroundReservationDesktop;
