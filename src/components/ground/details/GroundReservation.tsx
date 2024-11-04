'use client';

import { useContext, useState } from 'react';
import { Ground } from '@/types/item/ground/ground.types';
import { Timeframe } from '@/types/general.types';
import { GroundReservationContext } from '@/client/contexts/ground-reservation.context';
import GroundReservationCard from './GroundReservationCard';
import { GroundReservationClientService } from '@/client/services/ground-reservation.client-service';
import { Popup } from '@/components/utils/Popup';
import Balance from '@/components/shared/Balance';
import { usePopup } from '@/client/hooks/utils/usePopup';
import { TimeframeHelper } from '@/helpers/datetime/timeframe.helpers';
import { AlertContext } from '@/client/contexts/alert.context';
import { GENERIC_ERROR_MESSAGE } from '@/constants';

interface Props {
	ground: Ground;
}

function GroundReservation({ ground }: Props) {
	const showAlert = useContext(AlertContext);

	const [selectedDate, setSelectedDate] = useState<Date>(new Date());

	const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe | null>(
		null
	);

	const [openDatePicker, setOpenDatePicker] = useState(false);
	const [openTimesPicker, setOpenTimesPicker] = useState(false);

	const [reservedTimeframes, setReservedTimeframes] = useState<Timeframe[]>([]);
	const [loadingReservedTimeframes, setLoadingReservedTimeframes] =
		useState(false);

	const [openBalancePopup, toggleBalancePopup] = usePopup();

	const totalPrice = TimeframeHelper.getPrice(
		selectedTimeframe,
		ground.minReservationTime,
		ground.price
	);

	const duration = TimeframeHelper.toDuration(selectedTimeframe);

	const handleDateChange = async (date: Date) => {
		setLoadingReservedTimeframes(true);

		try {
			date.setHours(0, 0, 0, 0);

			const reservedTimeframes =
				await GroundReservationClientService.getReservedTimeframes(
					ground.id,
					date.getTime()
				);
			setReservedTimeframes(reservedTimeframes);

			setSelectedDate(date);
			setOpenTimesPicker(true);
		} catch (error) {
			console.error(error);
			showAlert({
				color: 'danger',
				message: GENERIC_ERROR_MESSAGE,
			});
		} finally {
			setSelectedTimeframe(null);
			setOpenDatePicker(false);
			setLoadingReservedTimeframes(false);
		}
	};

	const handleTimeframeChange = (timeframe: Timeframe) => {
		setSelectedTimeframe(timeframe);

		setOpenTimesPicker(false);
	};

	return (
		<div className='sticky bottom-0 lg:top-0 left-0 w-full h-max'>
			<GroundReservationContext.Provider
				value={{
					ground,
					openDatePicker,
					setOpenDatePicker,
					openTimesPicker,
					setOpenTimesPicker,
					selectedDate,
					setSelectedDate,
					selectedTimeframe,
					setSelectedTimeframe,
					handleDateChange,
					handleTimeframeChange,
					duration,
					reservedTimeframes,
					loadingReservedTimeframes,
					totalPrice,
					openBalancePopup,
					toggleBalancePopup,
				}}
			>
				<GroundReservationCard />

				<Popup
					title='Add credits'
					description='Insufficient credits on your balance, add credits to proceed.'
					open={openBalancePopup}
					onClose={toggleBalancePopup}
				>
					<Balance purchasePrice={totalPrice} onDeposit={toggleBalancePopup} />
				</Popup>
			</GroundReservationContext.Provider>
		</div>
	);
}

export default GroundReservation;
