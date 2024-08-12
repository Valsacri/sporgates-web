'use client';

import Calendar from 'react-calendar';
import Buttons from '../profile/Buttons';
import Dropdown from '../utils/Dropdown';
import Card from '../utils/Card';
import { useContext } from 'react';
import { GroundReservationContext } from '../ground/details/GroundReservation';
import Button from '../utils/Button';

function ReservationPickerDesktop() {
	const {
		openDatePicker,
		setOpenDatePicker,
		openTimesPicker,
		setOpenTimesPicker,
		handleDateChange,
		getTileClassName,
		selectedDate,
		times,
		hours,
		minutes,
	} = useContext(GroundReservationContext);

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

						<Button
							color='primary'
							className='ml-auto mt-3'
							onClick={() => setOpenTimesPicker(false)}
						>
							Close
						</Button>
					</Card>
				</Dropdown>
			</div>
		</div>
	);
}

export default ReservationPickerDesktop;
