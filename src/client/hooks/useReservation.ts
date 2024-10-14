'use client';

import { useContext, useState } from 'react';
import { UserContext } from '../contexts/user.context';
import { GroundReservationContext } from '../contexts/ground-reservation.context';
import { GroundReservationClientService } from '../services/ground-reservation.client-service';
import { Timeframe } from '@/types/general.types';
import { GroundRerservationStatus } from '@/types/item/ground.types';
import { WalletClientService } from '../services/wallet.client-service';
import { AlertContext } from '../contexts/alert.context';

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
		setLoading(true);

		try {
			const balance = await WalletClientService.getBalance();

			if (totalPrice > balance) {
				toggleBalancePopup();
			} else {
				await GroundReservationClientService.create({
					ground: ground.id,
					date: selectedDate.getTime(),
					timeframe: selectedTimeframe as Timeframe,
					user: user!.id,
					totalPrice,
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
				color: 'success',
				message: "An error happened, please try later",
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
