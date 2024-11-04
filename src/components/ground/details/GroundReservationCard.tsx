'use client';

import { GroundReservationContext } from '@/client/contexts/ground-reservation.context';
import { useReservation } from '@/client/hooks/useReservation';
import ReservationPicker from '@/components/shared/ReservationPicker';
import Button from '@/components/utils/Button';
import Card from '@/components/utils/Card';
import { useContext } from 'react';
import { twMerge } from 'tailwind-merge';

function GroundReservationCard() {
	const { loading, handleReserve } = useReservation();

	const { ground, selectedTimeframe, totalPrice } = useContext(
		GroundReservationContext
	);

	return (
		<Card className='sticky top-0 left-0 w-full h-max pt-5'>
			<ReservationPicker />

			<div className='flex justify-between items-center my-3 text-sm text-text-secondary-dark'>
				<h5>Price per hour</h5>
				<p className='text-success font-medium'>{ground.price} dh</p>
			</div>

			<Button
				icon={loading ? null : 'check'}
				color='primary'
				className={twMerge('w-full', !selectedTimeframe && 'cursor-default')}
				onClick={handleReserve}
				loading={loading}
				disableHover={!selectedTimeframe}
			>
				{selectedTimeframe
					? `Reserve now ${selectedTimeframe && `for ${totalPrice} dh`}`
					: 'Choose a timeframe'}
			</Button>
		</Card>
	);
}

export default GroundReservationCard;
