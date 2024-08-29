'use client';

import { useEffect, useMemo, useState } from 'react';
import useBreakpoint from '@/client/hooks/utils/useBreakpoint';
import GroundReservationMobile from './GroundReservationMobile';
import {
	compareTimeframes,
	generateTimeframes,
	minutesToDuration,
	timeframeToMinutes,
} from '@/helpers/datetime.helpers';
import { Ground } from '@/types/item/ground.types';
import { Timeframe } from '@/types/general.types';
import { GroundReservationContext } from '@/client/contexts/ground-reservation.context';
import GroundReservationDesktop from './GroundReservationDesktop';

interface Props {
	ground: Ground;
}

function GroundReservation({ ground }: Props) {
	const { breakpointsSize, windowWidth } = useBreakpoint();

	const [selectedDate, setSelectedDate] = useState<Date>(new Date());
	const [selectedTimes, setSelectedTimes] = useState<Timeframe[]>([]);

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
		setSelectedTimes([]); // Reset selected times when the date changes
		setOpenDatePicker(false);
		setOpenTimesPicker(true);
	};

	const handleTimesChange = (timeframe: Timeframe) => {
		let newTimes: Timeframe[];

		if (
			selectedTimes.some((selectedTimeframe) =>
				compareTimeframes(selectedTimeframe, timeframe)
			)
		) {
			// Remove the timeframe if it is already selected
			newTimes = selectedTimes.filter(
				(selectedTimeframe) => !compareTimeframes(selectedTimeframe, timeframe)
			);
		} else {
			// Add the timeframe if it is not selected
			newTimes = [...selectedTimes, timeframe];
		}

		// Sort newTimes based on the start time
		newTimes.sort((a, b) => {
			const startA = a.from.hours * 60 + a.from.minutes;
			const startB = b.from.hours * 60 + b.from.minutes;
			return startA - startB;
		});

		setSelectedTimes(newTimes);
	};

	// Function to calculate the total duration for the current day
	const { hours, minutes } = useMemo(() => {
		const totalMinutes = selectedTimes.reduce(
			(totalMinutes, timeframe) => totalMinutes + timeframeToMinutes(timeframe),
			0
		);

		return minutesToDuration(totalMinutes);
	}, [selectedTimes]);

	const times = useMemo(() => {
		const timeframes = generateTimeframes(8, 21, 30);

		return timeframes.map((timeframe) => {
			// Check if the timeframe is busy
			const isBusy = ground.busyHours[0]?.timeframes.some((busyTimeframe) =>
				compareTimeframes(busyTimeframe, timeframe)
			);

			// Check if the timeframe is selected
			const isSelected = selectedTimes.some((selectedTimeframe) =>
				compareTimeframes(selectedTimeframe, timeframe)
			);

			return {
				text: `${timeframe.from.hours}:${timeframe.from.minutes
					.toString()
					.padStart(2, '0')} - ${timeframe.to.hours}:${timeframe.to.minutes
					.toString()
					.padStart(2, '0')}`,
				onClick: () => handleTimesChange(timeframe),
				disabled: isBusy,
				selected: isSelected,
			};
		});
	}, [ground.busyHours, selectedTimes]);

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
			{/* Provide the context value */}
			<GroundReservationContext.Provider
				value={{
					ground,
					openDatePicker,
					setOpenDatePicker,
					openTimesPicker,
					setOpenTimesPicker,
					selectedDate,
					setSelectedDate,
					selectedTimes,
					setSelectedTimes,
					handleDateChange,
					handleTimesChange,
					getTileClassName,
					hours,
					minutes,
					times,
				}}
			>
				{isDesktop ? <GroundReservationDesktop /> : <GroundReservationMobile />}
			</GroundReservationContext.Provider>
		</div>
	);
}

export default GroundReservation;
