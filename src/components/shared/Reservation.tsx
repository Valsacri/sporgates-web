'use client';

import Calendar from 'react-calendar';
import Buttons from '../profile/Buttons';
import { useMemo, useState } from 'react';
import Dropdown from '../utils/Dropdown';
import Card from '../utils/Card';
import { generateTimeFrames } from '@/helpers/datetime';

interface Props {
	busyDates: Date[];
	busyHours: string[];
	handleTimeChange: (timeFrame: string) => void;
	selectedDate: Date;
	setSelectedDate: (date: Date) => void;
	selectedTimes: string[];
	setSelectedTimes: (times: string[]) => void;
}

function Reservation({
	busyDates,
	busyHours,
	handleTimeChange,
	selectedDate,
	setSelectedDate,
	selectedTimes,
	setSelectedTimes,
}: Props) {
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

	return (
		<div>
			<div className='flex border rounded-md'>
				<Dropdown
					open={openDatePicker}
					setOpen={setOpenDatePicker}
					containerClassName='w-1/2'
					className='shadow-none'
					trigger={
						<div className='border-r-[0.5px] p-3'>
							<h6>Date</h6>
							<p className='text-sm'>
								{selectedDate.toLocaleDateString('fr-FR')}
							</p>
						</div>
					}
				>
					<Card className='border'>
						<Calendar
							minDate={new Date()}
							showFixedNumberOfWeeks
							tileClassName={getTileClassName}
							onChange={(date) => handleDateChange(date as Date)}
						/>
					</Card>
				</Dropdown>

				<Dropdown
					open={openTimesPicker}
					setOpen={setOpenTimesPicker}
					containerClassName='w-1/2'
					trigger={
						<div className='border-r-[0.5px] p-3'>
							<h6>Duration</h6>
							<p className='text-sm'>
								{!hours && !minutes ? '----' : ''}
								{hours ? `${hours}h` : ''} {minutes ? `${minutes}min` : ''}
							</p>
						</div>
					}
				>
					<Card className='border'>
						<Buttons
							containerClassName='flex-1 grid grid-cols-2 lg:grid-cols-4 gap-2'
							color='secondary'
							items={times}
						/>

						{/* <div className='flex justify-end mt-3'>
							<Button
								color='primary'
								onClick={handleTimeChange}
								disabled={selectedTimes.length === 0}
							>
								Confirm
							</Button>
						</div> */}
					</Card>
				</Dropdown>
			</div>
		</div>
	);
}

export default Reservation;
