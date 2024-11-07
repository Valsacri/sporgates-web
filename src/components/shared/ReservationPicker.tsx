'use client';

import Calendar from 'react-calendar';
import Dropdown from '../utils/Dropdown';
import { useContext } from 'react';
import { GroundReservationContext } from '@/client/contexts/ground-reservation.context';
import TimeFramePicker from './TimeframePicker';
import { TimeHelper } from '@/helpers/datetime/time.helpers';
import { TimeframeHelper } from '@/helpers/datetime/timeframe.helpers';
import Loader from '../utils/Loader';
import { Popup } from '../utils/Popup';
import { BreakpointContext } from '@/client/contexts/breakpoint.context';

function ReservationPicker() {
	const breakpoint = useContext(BreakpointContext);

	const {
		openDatePicker,
		setOpenDatePicker,
		openTimesPicker,
		setOpenTimesPicker,
		handleDateChange,
		selectedTimeframe,
		handleTimeframeChange,
		selectedDate,
		duration,
		reservedTimeframes,
		loadingReservedTimeframes,
	} = useContext(GroundReservationContext);

	const formattedDuration = TimeHelper.formatDuration(duration);

	const getTileClassName = ({ date, view }: { date: Date; view: string }) => {
		if (view === 'month') {
			if (date.toDateString() === selectedDate.toDateString()) {
				return '!bg-primary text-white';
			}
		}
		return null;
	};

	return (
		<>
			<div className='w-full flex border rounded-md'>
				<div
					className='border-r-[0.5px] w-1/2 px-3 py-2 space-y-1 cursor-pointer'
					onClick={() => setOpenDatePicker(!openDatePicker)}
				>
					<h6>Date</h6>
					<p className='text-sm text-text-secondary-dark'>
						{selectedDate.toLocaleDateString('fr-FR')}
					</p>
				</div>
				<div
					className='w-1/2 px-3 py-2 space-y-1 cursor-pointer'
					onClick={() => setOpenTimesPicker(!openTimesPicker)}
				>
					<h6>Timeframe</h6>
					<p className='text-sm text-text-secondary-dark'>
						{loadingReservedTimeframes ? (
							<div className='flex'>
								<Loader className='size-5 ml-auto' />
							</div>
						) : selectedTimeframe ? (
							`${TimeframeHelper.format(
								selectedTimeframe!
							)} (${formattedDuration})`
						) : null}
					</p>
				</div>
			</div>

			{breakpoint?.isTablet ? (
				<>
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
							disabledTimeframes={reservedTimeframes}
							value={selectedTimeframe}
							onChange={handleTimeframeChange}
						/>
					</Popup>
				</>
			) : (
				<>
					<Dropdown
						open={openDatePicker}
						setOpen={setOpenDatePicker}
						containerClassName='w-1/2'
					>
						<Calendar
							minDate={new Date()}
							showFixedNumberOfWeeks
							tileClassName={getTileClassName}
							onChange={(date) => handleDateChange(date as Date)}
						/>
					</Dropdown>

					<Dropdown
						open={openTimesPicker}
						setOpen={setOpenTimesPicker}
						containerClassName='w-1/2'
					>
						<TimeFramePicker
							containerClassName='flex-1 grid grid-cols-2 lg:grid-cols-4 gap-1'
							startTime={{ hours: 8, minutes: 0 }}
							endTime={{ hours: 20, minutes: 0 }}
							interval={30}
							disabledTimeframes={reservedTimeframes}
							value={selectedTimeframe}
							onChange={handleTimeframeChange}
						/>
					</Dropdown>
				</>
			)}
		</>
	);
}

export default ReservationPicker;
