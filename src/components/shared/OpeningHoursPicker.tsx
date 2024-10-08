'use client';

import { Day, DAYS } from '@/client/types/general.types';
import {
	isTimeInTimeframe,
	simplifyOpeningHours,
} from '@/helpers/datetime.helpers';
import { OpeningHours } from '@/types/business.types';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

export interface Time {
	hours: number;
	minutes: number;
}

export interface Timeframe<T = Time> {
	start: T;
	end: T;
}

export interface OpeningHour {
	day: Day;
	hour: number;
}

interface Props {
	value: OpeningHours;
	onChange: (value: OpeningHours) => void;
	readOnly?: boolean;
}

const hours = Array.from({ length: 24 }, (_, i) => i);

const OpeningHoursPicker = ({
	value = {
		monday: [],
		tuesday: [],
		wednesday: [],
		thursday: [],
		friday: [],
		saturday: [],
		sunday: [],
	},
	onChange,
	readOnly = false,
}: Props) => {
	const [startHour, setStartHour] = useState<OpeningHour | null>(null);
	const [initialState, setInitialState] = useState<boolean | null>(null);

	const isSelected = (day: Day, hour: number) => {
		return value[day].some((timeframe) =>
			isTimeInTimeframe({ hours: hour, minutes: 0 }, timeframe)
		);
	};

	const handleClick = (day: Day, hour: number) => {
		if (readOnly) return;

		const currentSelected = isSelected(day, hour);

		if (!startHour) {
			// If no starting cell is selected, set the starting cell and its initial state
			setStartHour({ day, hour });
			setInitialState(currentSelected);
		} else {
			// If a starting cell is already selected, update the rectangle
			const updatedValue = { ...value };
			const minDayIndex = Math.min(
				DAYS.indexOf(startHour.day),
				DAYS.indexOf(day)
			);
			const maxDayIndex = Math.max(
				DAYS.indexOf(startHour.day),
				DAYS.indexOf(day)
			);
			const minHour = Math.min(startHour.hour, hour);
			const maxHour = Math.max(startHour.hour, hour);

			for (let d = minDayIndex; d <= maxDayIndex; d++) {
				for (let h = minHour; h <= maxHour; h++) {
					const currentDay = DAYS[d];
					const isCurrentlySelected = isSelected(currentDay, h);
					if (initialState) {
						// Remove timeframe if it was initially selected
						updatedValue[currentDay] = updatedValue[currentDay].filter(
							(timeframe) =>
								!(timeframe.start.hours === h && timeframe.end.hours === h + 1)
						);
					} else {
						// Add timeframe if it was initially unselected
						updatedValue[currentDay].push({
							start: { hours: h, minutes: 0 },
							end: { hours: h + 1, minutes: 0 },
						});
					}
				}
			}

			onChange(simplifyOpeningHours(updatedValue));
			setStartHour(null);
			setInitialState(null);
		}
	};

	return (
		<div className='select-none flex flex-col gap-0.5'>
			<div className='grid grid-cols-8 gap-0.5'>
				<div className='p-1'></div>
				{DAYS.map((day) => (
					<div key={day} className='text-center font-bold'>
						{day.slice(0, 3)}
					</div>
				))}
			</div>
			{hours.map((hour) => (
				<div key={hour} className='grid grid-cols-8 gap-0.5 items-center'>
					<div className='text-center font-bold'>{hour}</div>
					{DAYS.map((day) => (
						<div
							key={`${day}-${hour}`}
							className={twMerge(
								'h-8 cursor-pointer',
								startHour?.day === day && startHour?.hour === hour
									? // ? initialState
									  'bg-success-light'
									: isSelected(day, hour)
									? 'bg-success'
									: 'bg-secondary'
							)}
							onClick={() => handleClick(day, hour)}
						/>
					))}
				</div>
			))}
		</div>
	);
};

export default OpeningHoursPicker;
