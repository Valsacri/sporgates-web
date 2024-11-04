'use client';

import { useContext, useState } from 'react';
import { UserContext } from '../contexts/user.context';
import { GroundReservationContext } from '../contexts/ground-reservation.context';
import { GroundReservationClientService } from '../services/ground-reservation.client-service';
import { Timeframe } from '@/types/general.types';
import { GroundRerservationStatus } from '@/types/item/ground/ground-reservation.types';
import { AlertContext } from '../contexts/alert.context';
import { GENERIC_ERROR_MESSAGE } from '@/constants';

export const useReservation = () => {
	const [user] = useContext(UserContext);
	const {
		ground,
		selectedDate,
		setSelectedDate,
		selectedTimeframe,
		setSelectedTimeframe,
		toggleBalancePopup,
		totalPrice,
	} = useContext(GroundReservationContext);

	const showAlert = useContext(AlertContext);

	const [loading, setLoading] = useState(false);

	const handleReserve = async () => {
		if (!selectedDate || !selectedTimeframe) {
			return;
		}

		setLoading(true);

		try {
			// const balance = await WalletClientService.getBalance();

			if (false) {
				// if (totalPrice > balance) {
				toggleBalancePopup();
			} else {
				await GroundReservationClientService.create({
					business: ground.business as string,
					ground: ground.id,
					date: selectedDate.getTime(),
					timeframe: selectedTimeframe as Timeframe,
					user: user!.id,
					groundMinReservationTime: ground.minReservationTime,
					groundPrice: ground.price,
					status: GroundRerservationStatus.PENDING,
				});
				setSelectedDate(new Date());
				setSelectedTimeframe(null);

				showAlert({
					color: 'success',
					message: "Reservation request sent! You'll be notified soon!",
				});
			}
		} catch (error) {
			console.log(error);
			showAlert({
				color: 'danger',
				message: GENERIC_ERROR_MESSAGE,
			});
		} finally {
			setLoading(false);
		}
	};

	return {
		loading,
		handleReserve,
	};
};
