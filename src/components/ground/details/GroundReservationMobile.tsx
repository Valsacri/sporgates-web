'use client';

import { GroundReservationContext } from '@/client/contexts/ground-reservation.context';
import { useReservation } from '@/client/hooks/useReservation';
import ReservationPickerMobile from '@/components/shared/ReservationPickerMobile';
import Button from '@/components/utils/Button';
import Card from '@/components/utils/Card';
import { useContext } from 'react';

function GroundReservationMobile() {
	const { loading, handleReserve } = useReservation();

	const { selectedTimeframe, totalPrice } = useContext(GroundReservationContext);


	return (
		<Card className='sticky bottom-0 left-0 w-full h-max z-50 border-t rounded-t-none'>
			<ReservationPickerMobile />

			<Button
				icon='check'
				color='primary'
				className='w-full mt-3'
				onClick={handleReserve}
				loading={loading}
			>
				Reserve now {selectedTimeframe && `for ${totalPrice} dh`}
			</Button>
		</Card>
	);
}

export default GroundReservationMobile;
