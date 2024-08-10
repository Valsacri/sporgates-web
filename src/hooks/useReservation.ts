import { useState, useMemo } from 'react';
import { generateTimeFrames } from '@/helpers/datetime';

interface ReservationHookProps {
	selectedDate: Date;
	setSelectedDate: (date: Date) => void;
	selectedTimes: string[];
	setSelectedTimes: (times: string[]) => void;
	busyDates: Date[];
	busyHours: string[];
	handleTimeChange: (timeFrame: string) => void;
}

export function useReservation({
	selectedDate,
	setSelectedDate,
	selectedTimes,
	setSelectedTimes,
	busyDates,
	busyHours,
	handleTimeChange,
}: ReservationHookProps) {
	const [openDatePicker, setOpenDatePicker] = useState(false);
	const [openTimesPicker, setOpenTimesPicker] = useState(false);

	const getTileClassName = ({ date, view }: any) => {
		if (view === 'month') {
			if (
				busyDates.some(
					(highlightDate) =>
						date.toDateString() === highlightDate.toDateString()
				)
			) {
				return 'opacity-50';
			}
		}
		return null;
	};

	const handleDateChange = (date: Date) => {
		setSelectedDate(date);
		setSelectedTimes([]); // Reset selected times when the date changes
		setOpenDatePicker(false);
		setOpenTimesPicker(true);
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
			const isBusy = busyHours.includes(timeFrame);
			const isSelected = selectedTimes.includes(timeFrame);

			return {
				text: timeFrame,
				onClick: () => handleTimeChange(timeFrame),
				disabled: isBusy,
				selected: isSelected,
			};
		});
	}, [busyHours, selectedTimes]);

	return {
		openDatePicker,
		setOpenDatePicker,
		openTimesPicker,
		setOpenTimesPicker,
		getTileClassName,
		handleDateChange,
		hours,
		minutes,
		times,
	};
}
