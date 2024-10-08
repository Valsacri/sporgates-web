'use client';

import { useEffect, useState } from 'react';
import useBreakpoint from '@/client/hooks/utils/useBreakpoint';
import GroundReservationMobile from './GroundReservationMobile';
import { minutesToTime, timeframeToMinutes } from '@/helpers/datetime.helpers';
import { Ground } from '@/types/item/ground.types';
import { Time, Timeframe } from '@/types/general.types';
import { GroundReservationContext } from '@/client/contexts/ground-reservation.context';
import GroundReservationDesktop from './GroundReservationDesktop';

interface Props {
	ground: Ground;
}

function GroundReservation({ ground }: Props) {
	const { breakpointsSize, windowWidth } = useBreakpoint();

	const [selectedDate, setSelectedDate] = useState<Date>(new Date());

	const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe | null>(
		null
	);

	const [duration, setDuration] = useState<Time>({ hours: 0, minutes: 0 });

	const [openDatePicker, setOpenDatePicker] = useState(false);
	const [openTimesPicker, setOpenTimesPicker] = useState(false);

	const [isDesktop, setIsDesktop] = useState(false);

	useEffect(() => {
		if (windowWidth >= breakpointsSize.lg) {
			setIsDesktop(true);
		}
	}, [windowWidth]);

	const handleDateChange = (date: Date) => {
		setSelectedDate(date);
		setSelectedTimeframe(null);
		setOpenDatePicker(false);
		setOpenTimesPicker(true);
	};

	const handleTimeframeChange = (timeframe: Timeframe) => {
		setSelectedTimeframe(timeframe);
		setDuration(
			!timeframe.start || !timeframe.end
				? { hours: 0, minutes: 0 }
				: minutesToTime(timeframeToMinutes(timeframe as Timeframe<Time>))
		);
		setOpenTimesPicker(false);
	};

	const getTileClassName = ({ date, view }: { date: Date; view: string }) => {
		if (view === 'month') {
			if (date.toDateString() === selectedDate.toDateString()) {
				return 'bg-primary text-white';
			}
		}
		return null;
	};

	return (
		<div className='sticky bottom-0 lg:top-0 left-0 w-full h-max pt-5'>
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
					handleDateChange,
					handleTimeframeChange,
					getTileClassName,
					duration,
					setDuration,
				}}
			>
				{isDesktop ? <GroundReservationDesktop /> : <GroundReservationMobile />}
			</GroundReservationContext.Provider>
		</div>
	);
}

export default GroundReservation;
