import React, { createContext, useMemo, useState } from 'react';
import useBreakpoint from '@/client/hooks/utils/useBreakpoint';
import GroundReservationMobile from './GroundReservationMobile';
import GroundReservationDesktop from './GroundReservationDesktop';
import {
	compareTimeFrames,
	generateTimeFrames,
	minutesToDuration,
	timeFrameToMinutes,
} from '@/helpers/datetime.helpers';
import { Ground } from '@/types/item/ground.types';
import { Timeframe } from '@/types/general.types';
import { GroundReservationContext } from '@/client/contexts/ground-reservation.context';

interface Props {
	ground: Ground;
}

function GroundReservation({ ground }: Props) {
	const { breakpointsSize, windowWidth } = useBreakpoint();

	const [selectedDate, setSelectedDate] = useState<Date>(new Date());
	const [selectedTimes, setSelectedTimes] = useState<Timeframe[]>([]);

	const [openDatePicker, setOpenDatePicker] = useState(false);
	const [openTimesPicker, setOpenTimesPicker] = useState(false);

	const handleDateChange = (date: Date) => {
		setSelectedDate(date);
		setSelectedTimes([]); // Reset selected times when the date changes
		setOpenDatePicker(false);
		setOpenTimesPicker(true);
	};

	const handleTimesChange = (timeFrame: Timeframe) => {
		let newTimes: Timeframe[];

		if (
			selectedTimes.some((selectedTimeFrame) =>
				compareTimeFrames(selectedTimeFrame, timeFrame)
			)
		) {
			// Remove the timeFrame if it is already selected
			newTimes = selectedTimes.filter(
				(selectedTimeFrame) => !compareTimeFrames(selectedTimeFrame, timeFrame)
			);
		} else {
			// Add the timeFrame if it is not selected
			newTimes = [...selectedTimes, timeFrame];
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
			(totalMinutes, timeFrame) => totalMinutes + timeFrameToMinutes(timeFrame),
			0
		);

		return minutesToDuration(totalMinutes);
	}, [selectedTimes]);

	const times = useMemo(() => {
		const timeFrames = generateTimeFrames(8, 21, 30);

		return timeFrames.map((timeFrame) => {
			// Check if the timeFrame is busy
			const isBusy = ground.busyHours[0].hours.some((busyTimeFrame) =>
				compareTimeFrames(busyTimeFrame, timeFrame)
			);

			// Check if the timeFrame is selected
			const isSelected = selectedTimes.some((selectedTimeFrame) =>
				compareTimeFrames(selectedTimeFrame, timeFrame)
			);

			return {
				text: `${timeFrame.from.hours}:${timeFrame.from.minutes
					.toString()
					.padStart(2, '0')} - ${timeFrame.to.hours}:${timeFrame.to.minutes
					.toString()
					.padStart(2, '0')}`,
				onClick: () => handleTimesChange(timeFrame),
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
				{windowWidth < breakpointsSize.lg ? (
					<GroundReservationMobile />
				) : (
					<GroundReservationDesktop />
				)}
			</GroundReservationContext.Provider>
		</div>
	);
}

export default GroundReservation;
