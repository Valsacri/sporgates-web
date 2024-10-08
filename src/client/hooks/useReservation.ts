'use client';

import { useContext, useState } from 'react';
import { UserContext } from '../contexts/user.context';
import { GroundReservationContext } from '../contexts/ground-reservation.context';
import { GroundReservationClientService } from '../services/ground-reservation.client-service';
import { timeframeToMinutes } from '@/helpers/datetime.helpers';
import { Timeframe } from '@/types/general.types';

export const useReservation = () => {
	const [user] = useContext(UserContext);
	const { ground, selectedDate, selectedTimeframe } = useContext(
		GroundReservationContext
	);

	const [loading, setLoading] = useState(false);

	const handleReserve = async () => {
		setLoading(true);
		await GroundReservationClientService.create({
			ground: ground.id,
			date: selectedDate.getTime(),
			timeframe: selectedTimeframe as Timeframe,
			user: user!.id,
			totalPrice:
				(timeframeToMinutes(selectedTimeframe as Timeframe) /
					ground.minReservationTime) *
				ground.price,
		});
		setLoading(false);
	};

	return {
		loading,
		handleReserve,
	};
};
