'use client';

import Calendar from 'react-calendar';
import Dropdown from '../utils/Dropdown';
import Card from '../utils/Card';
import { useContext } from 'react';
import { GroundReservationContext } from '@/client/contexts/ground-reservation.context';
import TimeFramePicker from './TimeframePicker';
import { TimeHelper } from '@/helpers/datetime/time.helpers';
import { TimeframeHelper } from '@/helpers/datetime/timeframe.helpers';
import Loader from '../utils/Loader';

function ReservationPickerDesktop() {
	const {
		openDatePicker,
		setOpenDatePicker,
		openTimesPicker,
		setOpenTimesPicker,
		handleDateChange,
		selectedTimeframe,
		handleTimeframeChange,
		getTileClassName,
		selectedDate,
		duration,
		reservedTimeframes,
		loadingReservedTimeframes,
	} = useContext(GroundReservationContext);

	const formattedDuration = TimeHelper.formatDuration(duration);

	return (
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
				<Card className='border p-2'>
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
						<h6>Timeframe</h6>
						<p className='text-sm'>
							{loadingReservedTimeframes ? (
								<div className='flex'>
									Choose hours <Loader className='size-5 ml-auto' />
								</div>
							) : selectedTimeframe ? (
								`${TimeframeHelper.format(
									selectedTimeframe!
								)} (${formattedDuration})`
							) : (
								'Choose hours'
							)}
						</p>
					</div>
				}
			>
				<Card className='border p-2'>
					<TimeFramePicker
						containerClassName='flex-1 grid grid-cols-2 lg:grid-cols-4 gap-1'
						startTime={{ hours: 8, minutes: 0 }}
						endTime={{ hours: 20, minutes: 0 }}
						interval={30}
						disabledTimeframes={reservedTimeframes}
						value={selectedTimeframe}
						onChange={handleTimeframeChange}
					/>
				</Card>
			</Dropdown>
		</div>
	);
}

export default ReservationPickerDesktop;
