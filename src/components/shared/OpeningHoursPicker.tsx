'use client';

import { Day, DAYS } from '@/client/types/general.types';
import { OpeningHours } from '@/types/business.types';
import { useMemo, useState } from 'react';
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
	const grid = useMemo(() => {
		// Create a grid where each row represents an hour (0–23),
		// and each column represents a day of the week.
		return hours.map((hour) => {
			// For each hour, map it to an array of booleans representing each day (Monday to Sunday)
			return DAYS.map((day) => {
				// Check if the current hour is selected for the current day
				return value[day].some(
					(timeframe) =>
						timeframe.start.hours <= hour && hour < timeframe.end.hours
				);
			});
		});
	}, [value]);

	const [startCell, setStartCell] = useState<{
		hourIndex: number;
		dayIndex: number;
	} | null>(null);

	const isSelected = (hourIndex: number, dayIndex: number) => {
		return grid[hourIndex][dayIndex];
	};

	const handleClick = (hourIndex: number, dayIndex: number) => {
		if (readOnly) return;

		if (!startCell) {
			// If no starting cell is selected, set the starting cell and its initial state
			setStartCell({ hourIndex, dayIndex });
		} else {
			// If a starting cell is already selected, update the rectangle

			const isStartCellSelected = isSelected(hourIndex, dayIndex);

			const minDayIndex = Math.min(startCell.dayIndex, dayIndex);
			const maxDayIndex = Math.max(startCell.dayIndex, dayIndex);

			const minHour = Math.min(startCell.hourIndex, hourIndex);
			const maxHour = Math.max(startCell.hourIndex, hourIndex);

			for (let h = minHour; h <= maxHour; h++) {
				for (let d = minDayIndex; d <= maxDayIndex; d++) {
					grid[h][d] = !isStartCellSelected;
				}
			}

			onChange(transformGridToOpeningHours(grid));
			setStartCell(null);
		}
	};

	const transformGridToOpeningHours = (grid: boolean[][]) => {
		const openingHours: OpeningHours = {
			monday: [],
			tuesday: [],
			wednesday: [],
			thursday: [],
			friday: [],
			saturday: [],
			sunday: [],
		};

		// Loop over each day (i.e., each column in the grid)
		DAYS.forEach((day, dayIndex) => {
			const timeframes: Timeframe[] = [];
			let currentTimeframe: Timeframe | null = null;

			for (let hour = 0; hour < grid.length; hour++) {
				const isSelected = grid[hour][dayIndex];

				if (isSelected) {
					// If this hour is selected and there's no current timeframe, start a new one
					if (!currentTimeframe) {
						currentTimeframe = {
							start: { hours: hour, minutes: 0 },
							end: { hours: hour + 1, minutes: 0 }, // We start by assuming it's a one-hour block
						};
					} else {
						// Extend the current timeframe by one hour
						currentTimeframe.end.hours = hour + 1;
					}
				} else {
					// If this hour is not selected, and we have an active timeframe, close it
					if (currentTimeframe) {
						timeframes.push(currentTimeframe);
						currentTimeframe = null;
					}
				}
			}

			// If the day ends and we're still tracking a timeframe, close it
			if (currentTimeframe) {
				timeframes.push(currentTimeframe);
			}

			// Assign the timeframes for this day to the openingHours object
			openingHours[day] = timeframes;
		});

		return openingHours;
	};

	return (
		<div className='select-none flex flex-col gap-0.5'>
			<div className='grid grid-cols-8 gap-0.5'>
				<div className='p-1'></div>
				{DAYS.map((day) => (
					<div key={day} className='text-center capitalize text-xs'>
						{day.slice(0, 3)}
					</div>
				))}
			</div>
			{grid.map((row, hourIndex) => (
				<div key={hourIndex} className='grid grid-cols-8 gap-0.5 items-center'>
					<div className='text-center text-xs'>{hourIndex}</div>
					{row.map((isSelected, dayIndex) => (
						<div
							key={`${hourIndex}-${dayIndex}`}
							className={twMerge(
								'h-8',
								!readOnly && 'cursor-pointer',
								startCell?.hourIndex === hourIndex &&
									startCell?.dayIndex === dayIndex
									? // ? initialState
									  'bg-success-light'
									: isSelected
									? 'bg-success'
									: 'bg-secondary'
							)}
							onClick={() => handleClick(hourIndex, dayIndex)}
						/>
					))}
				</div>
			))}
		</div>
	);
};

export default OpeningHoursPicker;
