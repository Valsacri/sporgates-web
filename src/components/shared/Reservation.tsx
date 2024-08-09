import Calendar from 'react-calendar';
import Buttons from '../profile/Buttons';
import Button from '../utils/Button';
import { useMemo, useState } from 'react';
import Dropdown from '../utils/Dropdown';
import Card from '../utils/Card';

const generateTimeFrames = (
	startHour: number,
	endHour: number,
	interval = 60
) => {
	const timeFrames = [];

	for (let hour = startHour; hour < endHour; hour++) {
		for (let minute = 0; minute < 60; minute += interval) {
			const startTime = `${hour.toString().padStart(2, '0')}:${minute
				.toString()
				.padStart(2, '0')}`;
			const endMinute = minute + interval;
			const endHourAdjusted = hour + Math.floor(endMinute / 60);
			const endTime = `${endHourAdjusted.toString().padStart(2, '0')}:${(
				endMinute % 60
			)
				.toString()
				.padStart(2, '0')}`;
			const timeFrame = `${startTime} - ${endTime}`;
			timeFrames.push(timeFrame);
		}
	}

	return timeFrames;
};

function Reservation() {
	const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
	const [view, setView] = useState<'date' | 'hours'>('date');

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

	const handleDateChange = () => {
		setSelectedTimes([]); // Reset selected times when the date changes
	};

	const handleTimeClick = (timeFrame: string) => {
		setSelectedTimes((prevSelectedTimes) =>
			prevSelectedTimes.includes(timeFrame)
				? prevSelectedTimes.filter((time) => time !== timeFrame)
				: [...prevSelectedTimes, timeFrame]
		);
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

	const handleSubmit = () => {
		if (view === 'date') {
			setView('hours');
		}
	};

	const handleBack = () => {
		setView('date');
	};

	return (
		<div>
			<div className='flex border rounded-md'>
				<Dropdown
					containerClassName='w-1/2'
					trigger={
						<div className='border-r-[0.5px] p-3'>
							<h6>Date</h6>
							<p className='text-sm'>12/12/2021</p>
						</div>
					}
				>
					<Card>
						<Calendar
							minDate={new Date()}
							showFixedNumberOfWeeks
							tileClassName={getTileClassName}
							onChange={handleDateChange}
						/>
					</Card>
				</Dropdown>

				<Dropdown
					containerClassName='w-1/2'
					trigger={
						<div className='border-r-[0.5px] p-3'>
							<h6>Duration</h6>
							<p className='text-sm'>2 hours 30 min</p>
						</div>
					}
				>
					<Card>
						<Buttons
							containerClassName='flex-1 grid grid-cols-2 lg:grid-cols-4 gap-2'
							color='secondary'
							items={generateTimeFrames(8, 21, 30).map((timeFrame) => ({
								text: timeFrame,
								disabled: busyHours.includes(timeFrame),
								selected: selectedTimes.includes(timeFrame),
								color: selectedTimes.includes(timeFrame)
									? 'primary'
									: 'secondary',
								onClick() {
									handleTimeClick(timeFrame);
								},
							}))}
						/>

						<div className='flex justify-end mt-3'>
							<Button
								color='primary'
								onClick={handleSubmit}
								disabled={selectedTimes.length === 0}
							>
								Confirm
							</Button>
						</div>
					</Card>
				</Dropdown>
			</div>
		</div>
	);
}

export default Reservation;
