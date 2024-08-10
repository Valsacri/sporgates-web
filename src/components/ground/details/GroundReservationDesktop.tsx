'use client';

import Buttons from '@/components/profile/Buttons';
import Reservation from '@/components/shared/Reservation';
import Button from '@/components/utils/Button';
import Card from '@/components/utils/Card';
import { useMemo, useState } from 'react';

function GroundReservationDesktop() {
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());
	const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

	const handleTimeChange = (timeFrame: string) => {
		let newTimes;
		if (selectedTimes.includes(timeFrame)) {
			newTimes = selectedTimes.filter((time) => time !== timeFrame);
		} else {
			newTimes = [...selectedTimes, timeFrame];
		}
		newTimes.sort((a, b) => a.localeCompare(b));
		setSelectedTimes(newTimes);
	};

	const times = useMemo(
		() =>
			selectedTimes.map((time) => ({
				text: time,
				onClick: () => handleTimeChange(time),
			})),
		[selectedTimes]
	);

	const hourlyPrice = 50;

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

	return (
		<Card className='sticky top-0 left-0 w-full h-max pt-5'>
			<Reservation
				busyDates={busyDates}
				busyHours={busyHours}
				handleTimeChange={handleTimeChange}
				selectedDate={selectedDate}
				setSelectedDate={setSelectedDate}
				selectedTimes={selectedTimes}
				setSelectedTimes={setSelectedTimes}
			/>

			{times.length > 0 ? (
				<Buttons
					containerClassName='flex-1 grid grid-cols-2 lg:grid-cols-3 gap-2 my-5'
					items={times}
				/>
			) : (
				<div className='h-5'></div>
			)}

			<Button icon='check' color='primary' className='w-full'>
				Reserve now
			</Button>

			<hr className='mb-5' />

			<div className='flex justify-between'>
				<h3>Total</h3>
				<p className='text-success'>{selectedTimes.length * hourlyPrice} dh</p>
			</div>

			<div className='flex justify-between'>
				<h3>Price</h3>
				<p className='text-success'>{selectedTimes.length * hourlyPrice} dh</p>
			</div>
		</Card>
	);
}

export default GroundReservationDesktop;
