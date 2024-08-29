'use client';

import { GroundReservationContext } from '@/client/contexts/ground-reservation.context';
import { useReservation } from '@/client/hooks/useReservation';
import ReservationPickerMobile from '@/components/shared/ReservationPickerMobile';
import Button from '@/components/utils/Button';
import Card from '@/components/utils/Card';
import { timeframeToMinutes } from '@/helpers/datetime.helpers';
import { Timeframe } from '@/types/general.types';
import { useContext } from 'react';

function GroundReservationMobile() {
	const { loading, handleReserve } = useReservation();

	const { ground, selectedTimeframe } = useContext(GroundReservationContext);

	const totalPrice =
		!selectedTimeframe.start || !selectedTimeframe.end
			? 0
			: (timeframeToMinutes(selectedTimeframe as Timeframe) /
					ground.minReservationTime) *
			  ground.price;

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
				Reserve now {selectedTimeframe.end && `for ${totalPrice} dh`}
			</Button>
		</Card>
	);
}

export default GroundReservationMobile;
