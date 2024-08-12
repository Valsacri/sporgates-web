import React, { createContext, useMemo, useState } from 'react';
import useBreakpoint from '@/hooks/utils/useBreakpoint';
import GroundReservationMobile from './GroundReservationMobile';
import GroundReservationDesktop from './GroundReservationDesktop';
import { generateTimeFrames } from '@/helpers/datetime';
import { Ground } from '@/types/business.interface';

// Create a new context
export const GroundReservationContext = createContext<{
	ground: Ground;

	openDatePicker: boolean;
	setOpenDatePicker: React.Dispatch<React.SetStateAction<boolean>>;
	openTimesPicker: boolean;
	setOpenTimesPicker: React.Dispatch<React.SetStateAction<boolean>>;

	selectedDate: Date;
	setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
	selectedTimes: string[];
	setSelectedTimes: React.Dispatch<React.SetStateAction<string[]>>;

	handleDateChange: (date: Date) => void;
	handleTimesChange: (timeFrame: string) => void;

	getTileClassName: (data: any) => any;

	hours: number;
	minutes: number;
	times: {
		text: string;
		onClick: () => void;
		disabled: boolean;
		selected: boolean;
	}[];
}>({
	ground: {} as Ground,
	openDatePicker: false,
	setOpenDatePicker: () => {},
	openTimesPicker: false,
	setOpenTimesPicker: () => {},
	selectedDate: new Date(),
	setSelectedDate: () => {},
	selectedTimes: [],
	setSelectedTimes: () => {},
	handleDateChange: () => {},
	handleTimesChange: () => {},
	getTileClassName: () => {},
	hours: 0,
	minutes: 0,
	times: [],
});

interface Props {
	ground: Ground;
}

function GroundReservation({ ground }: Props) {
	const { breakpointsSize, windowWidth } = useBreakpoint();

	const [selectedDate, setSelectedDate] = useState<Date>(new Date());
	const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

	const [openDatePicker, setOpenDatePicker] = useState(false);
	const [openTimesPicker, setOpenTimesPicker] = useState(false);

	const handleDateChange = (date: Date) => {
		setSelectedDate(date);
		setSelectedTimes([]); // Reset selected times when the date changes
		setOpenDatePicker(false);
		setOpenTimesPicker(true);
	};

	const handleTimesChange = (timeFrame: string) => {
		let newTimes;
		if (selectedTimes.includes(timeFrame)) {
			newTimes = selectedTimes.filter((time) => time !== timeFrame);
		} else {
			newTimes = [...selectedTimes, timeFrame];
		}
		newTimes.sort((a, b) => a.localeCompare(b));
		setSelectedTimes(newTimes);
	};

	// Function to calculate the total duration for the current day
	const [hours, minutes] = useMemo(() => {
		let totalMinutes = 0;

		selectedTimes.forEach((timeFrame) => {
			const [start, end] = timeFrame.split(' - ');
			const [startHours, startMinutes] = start.split(':').map(Number);
			const [endHours, endMinutes] = end.split(':').map(Number);

			let duration =
				endHours * 60 + endMinutes - (startHours * 60 + startMinutes);
			if (duration < 0) {
				duration += 24 * 60; // handle overflow to the next day
			}
			totalMinutes += duration;
		});

		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;

		return [hours, minutes];
	}, [selectedTimes]);

	const times = useMemo(() => {
		const timeFrames = generateTimeFrames(8, 21, 30);

		return timeFrames.map((timeFrame) => {
			const isBusy = ground.busyHours[0].hours.includes(timeFrame);
			const isSelected = selectedTimes.includes(timeFrame);

			return {
				text: timeFrame,
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
		<div className='sticky bottom-0 lg:top-0 left-0 w-full h-max pt-5 z-50'>
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
