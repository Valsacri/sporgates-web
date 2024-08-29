'use client';

import Calendar from 'react-calendar';
import { useContext } from 'react';
import { Popup } from '../utils/Popup';
import Button from '../utils/Button';
import { GroundReservationContext } from '@/client/contexts/ground-reservation.context';
import TimeFramePicker from './TimeframePicker';

function ReservationPickerMobile() {
	const {
		ground,
		openDatePicker,
		setOpenDatePicker,
		openTimesPicker,
		setOpenTimesPicker,
		handleDateChange,
		getTileClassName,
		selectedDate,
		duration: { hours, minutes },
	} = useContext(GroundReservationContext);

	return (
		<>
			<div className='flex justify-between items-center'>
				<h4 className='text-success-dark'>{ground.price} dh/h</h4>
				<div className='text-sm font-semibold'>
					<button className='underline' onClick={() => setOpenDatePicker(true)}>
						{selectedDate.toLocaleDateString('fr-FR')}
					</button>{' '}
					-{' '}
					<button
						className='underline'
						onClick={() => setOpenTimesPicker(true)}
					>
						{!hours && !minutes ? 'Choose hours' : ''}{' '}
						{hours ? `${hours}h` : ''} {minutes ? `${minutes}min` : ''}
					</button>
				</div>
			</div>

			<Popup
				title='Choose a date'
				open={openDatePicker}
				setOpen={setOpenDatePicker}
				onClose={() => setOpenDatePicker(false)}
			>
				<Calendar
					minDate={new Date()}
					showFixedNumberOfWeeks
					tileClassName={getTileClassName}
					onChange={(date) => handleDateChange(date as Date)}
				/>
			</Popup>

			<Popup
				title='Choose hours'
				open={openTimesPicker}
				onClose={() => setOpenTimesPicker(false)}
				className='w-full'
			>
				<TimeFramePicker
					containerClassName='grid grid-cols-2 lg:grid-cols-4 gap-2'
					startTime={{ hours: 8, minutes: 0 }}
					endTime={{ hours: 20, minutes: 0 }}
					interval={30}
				/>

				{/* <Button
					color='primary'
					className='ml-auto mt-3 w-full'
					onClick={() => setOpenTimesPicker(false)}
				>
					Close
				</Button> */}
			</Popup>
		</>
	);
}

export default ReservationPickerMobile;
