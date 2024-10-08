'use client';

import { OpeningHours } from '@/types/business.types';
import { Timeframe } from '@/types/general.types';
import { useState, useEffect } from 'react';



const defaultValue = {
	monday: [],
	tuesday: [],
	wednesday: [],
	thursday: [],
	friday: [],
	saturday: [],
	sunday: [],
};

interface Props {
	value: OpeningHours;
	onChange: (value: OpeningHours) => void;
	readOnly?: boolean;
}

const daysOfWeek = [
	'monday',
	'tuesday',
	'wednesday',
	'thursday',
	'friday',
	'saturday',
	'sunday',
] as const;
const daysShort = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const hours = Array.from({ length: 24 }, (_, i) => i);

const OpeningHoursPicker = ({ value, onChange, readOnly = false }: Props) => {
	const [selection, setSelection] = useState<OpeningHours>(value);
	const [startPoint, setStartPoint] = useState<{
		day: keyof OpeningHours;
		hour: number;
	} | null>(null);

	useEffect(() => {
		setSelection(value);
	}, [value]);

	const hourToTimeframe = (hour: number): Timeframe => ({
		start: { hours: hour, minutes: 0 },
		end: { hours: hour + 1, minutes: 0 },
	});

	const toggleHour = (
		day: keyof OpeningHours,
		hour: number,
		toggleState: boolean
	) => {
		if (readOnly) return;
		const updatedSelection = { ...selection };
		const hourFrame = hourToTimeframe(hour);

		if (toggleState) {
			// Add hour frame if selected
			updatedSelection[day] = [...updatedSelection[day], hourFrame];
		} else {
			// Remove hour frame if unselected
			updatedSelection[day] = updatedSelection[day].filter(
				(frame) => frame.start.hours !== hour || frame.start.minutes !== 0
			);
		}

		setSelection(updatedSelection);
		onChange?.(updatedSelection);
	};

	const handleCellClick = (day: keyof OpeningHours, hour: number) => {
		const isSelected = selection[day].some(
			(frame) => frame.start.hours === hour && frame.start.minutes === 0
		);

		if (!startPoint) {
			// First click (starting cell)
			setStartPoint({ day, hour });
			// Instantly change to light green or light gray based on selection
			if (!isSelected) {
				const updatedSelection = { ...selection };
				updatedSelection[day] = [...updatedSelection[day], hourToTimeframe(hour)];
				setSelection(updatedSelection);
				onChange?.(updatedSelection);
			} else {
				const updatedSelection = { ...selection };
				updatedSelection[day] = updatedSelection[day].filter(
					(frame) => frame.start.hours !== hour || frame.start.minutes !== 0
				);
				setSelection(updatedSelection);
				onChange?.(updatedSelection);
			}
		} else {
			// Second click (defining rectangle with starting cell)
			const startDayIndex = daysOfWeek.indexOf(startPoint.day);
			const endDayIndex = daysOfWeek.indexOf(day);
			const minDayIndex = Math.min(startDayIndex, endDayIndex);
			const maxDayIndex = Math.max(startDayIndex, endDayIndex);
			const minHour = Math.min(startPoint.hour, hour);
			const maxHour = Math.max(startPoint.hour, hour);
			const startCellWasSelected = !isSelected; // State of the first cell clicked

			for (let dayIndex = minDayIndex; dayIndex <= maxDayIndex; dayIndex++) {
				const currentDay = daysOfWeek[dayIndex];
				for (let currentHour = minHour; currentHour <= maxHour; currentHour++) {
					const isCurrentlySelected = selection[currentDay].some(
						(frame) =>
							frame.start.hours === currentHour && frame.start.minutes === 0
					);
					// Toggle the state based on the initial cell (A)
					toggleHour(currentDay, currentHour, !startCellWasSelected);
				}
			}

			setStartPoint(null); // Reset starting point after completing the rectangle
		}
	};

	return (
		<div className='select-none flex flex-col gap-0.5'>
			<div className='grid grid-cols-8 gap-0.5'>
				<div className='p-1'></div>
				{daysShort.map((day) => (
					<div key={day} className='text-center font-bold'>
						{day}
					</div>
				))}
			</div>
			{hours.map((hour) => (
				<div key={hour} className='grid grid-cols-8 gap-0.5 items-center'>
					<div className='text-center font-bold'>{hour}</div>
					{daysOfWeek.map((day) => {
						const isSelected = selection[day].some(
							(frame) => frame.start.hours === hour && frame.start.minutes === 0
						);
						return (
							<div
								key={`${day}-${hour}`}
								className={`h-8 cursor-pointer ${
									isSelected ? 'bg-green-500' : 'bg-gray-300'
								}`}
								onClick={() => handleCellClick(day, hour)}
							/>
						);
					})}
				</div>
			))}
		</div>
	);
};

export default OpeningHoursPicker;
