import Calendar from 'react-calendar';
import Buttons from '../profile/Buttons';
import Button from '../utils/Button';
import { useState } from 'react';

const generateTimeFrames = (startHour: number, endHour: number, interval = 60) => {
	const timeFrames = [];

	for (let hour = startHour; hour < endHour; hour++) {
		for (let minute = 0; minute < 60; minute += interval) {
			const startTime = `${hour.toString().padStart(2, '0')}:${minute
				.toString()
				.padStart(2, '0')}`;
			const endMinute = minute + interval;
			const endHourAdjusted = hour + Math.floor(endMinute / 60);
			const endTime = `${endHourAdjusted.toString().padStart(2, '0')}:${(endMinute % 60)
				.toString()
				.padStart(2, '0')}`;
			const timeFrame = `${startTime} - ${endTime}`;
			timeFrames.push(timeFrame);
		}
	}

	return timeFrames;
};

function Reservation() {
	const [date, setDate] = useState(new Date());
	const [selectedTimes, setSelectedTimes] = useState<
		{ date: string; times: string[] }[]
	>([]);

	const busyDates = [
		new Date(2024, 7, 12),
		new Date(2024, 7, 13),
		new Date(2024, 7, 14),
		new Date(2024, 7, 15),
	];

	const busyHours = [
		'08:00 - 08:30',
		'08:30 - 09:00',
		'09:00 - 09:30',
		'09:30 - 10:00',
		'14:30 - 15:00',
		'15:00 - 15:30',
		'15:30 - 16:00',
		'16:00 - 16:30',
		'19:00 - 19:30',
		'19:30 - 20:00',
		'20:00 - 20:30',
		'20:30 - 21:00',
	];

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

	const handleDateChange = (selectedDate: Date) => {
		setDate(selectedDate);
	};

	const handleTimeClick = (timeFrame: string) => {
		const dateKey = date.toDateString();
		setSelectedTimes((prevSelectedTimes) => {
			const existingEntry = prevSelectedTimes.find(
				(entry) => entry.date === dateKey
			);

			if (existingEntry) {
				const newTimes = existingEntry.times.includes(timeFrame)
					? existingEntry.times.filter((time) => time !== timeFrame)
					: [...existingEntry.times, timeFrame];
				return prevSelectedTimes.map((entry) =>
					entry.date === dateKey ? { ...entry, times: newTimes } : entry
				);
			} else {
				return [...prevSelectedTimes, { date: dateKey, times: [timeFrame] }];
			}
		});
	};

	// Function to calculate the total duration across all selected dates
	const calculateTotalDuration = () => {
		let totalMinutes = 0;

		selectedTimes.forEach(({ times }) => {
			times.forEach((timeFrame) => {
				const [start, end] = timeFrame.split(' - ');
				const [startHours, startMinutes] = start.split(':').map(Number);
				const [endHours, endMinutes] = end.split(':').map(Number);

				let duration = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);
				if (duration < 0) {
					duration += 24 * 60; // handle overflow to the next day
				}
				totalMinutes += duration;
			});
		});

		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;

		return { hours, minutes };
	};

	const { hours, minutes } = calculateTotalDuration();

	const selectedTimesForDate =
		selectedTimes.find((entry) => entry.date === date.toDateString())?.times || [];

    
	return (
		<div>
			<div className='flex flex-col lg:flex-row gap-5'>
				<Calendar
					minDate={new Date()}
					showFixedNumberOfWeeks
					tileClassName={getTileClassName}
					onChange={(value) => handleDateChange(value as Date)}
				/>

				<Buttons
					containerClassName='flex-1 grid grid-cols-2 lg:grid-cols-4 gap-2'
					color='secondary'
					items={generateTimeFrames(8, 21, 30).map((timeFrame) => ({
						text: timeFrame,
						disabled: busyHours.includes(timeFrame),
						selected: selectedTimesForDate.includes(timeFrame),
						color: selectedTimesForDate.includes(timeFrame)
							? 'primary'
							: 'secondary',
						onClick() {
							handleTimeClick(timeFrame);
						},
					}))}
				/>
			</div>

			<Button icon='check' color='primary' className='ml-auto mt-5'>
				Checkout | {hours} hours {minutes ? `${minutes} min` : ''}
			</Button>
		</div>
	);
}

export default Reservation;
