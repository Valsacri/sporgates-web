'use client';

import { useContext, useState } from 'react';
import { UserContext } from '../contexts/user.context';
import { GroundReservationContext } from '../contexts/ground-reservation.context';
import { GroundReservationClientService } from '../services/ground-reservation.client-service';

export const useReservation = () => {
	const [user] = useContext(UserContext);
	const { ground, selectedDate, selectedTimes } = useContext(
		GroundReservationContext
	);

	const [loading, setLoading] = useState(false);

	const handleReserve = async () => {
		setLoading(true);
		await GroundReservationClientService.create({
			ground: ground.id,
			dateTimeframes: {
				date: selectedDate.getTime(),
				timeframes: selectedTimes,
			},
			user: user!.id,
			totalPrice: selectedTimes.length * ground.price,
		});
		setLoading(false);
	};

	return {
		loading,
		handleReserve,
	};
};
