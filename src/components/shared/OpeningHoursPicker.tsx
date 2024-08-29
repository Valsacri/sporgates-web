'use client';

import { OpeningHours } from '@/types/business.types';
import React, { useState, useRef, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

const days = [
	{ id: 'monday', display: 'Mon' },
	{ id: 'tuesday', display: 'Tue' },
	{ id: 'wednesday', display: 'Wed' },
	{ id: 'thursday', display: 'Thu' },
	{ id: 'friday', display: 'Fri' },
	{ id: 'saturday', display: 'Sat' },
	{ id: 'sunday', display: 'Sun' },
];
const hours = Array.from({ length: 24 }, (_, i) => i);

type Cell = {
	day: number;
	hour: number;
	selected: boolean;
	highlighted: boolean;
};

type OpeningHoursPickerProps = {
	value?: OpeningHours;
	onChange?: (openingHours: OpeningHours) => void;
	readOnly?: boolean;
};

const OpeningHoursPicker: React.FC<OpeningHoursPickerProps> = ({
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
}) => {
	const [grid, setGrid] = useState<Cell[][]>(
		Array.from({ length: 24 }, (_, hour) =>
			Array.from({ length: 7 }, (_, day) => ({
				day,
				hour,
				selected: false,
				highlighted: false,
			}))
		)
	);
	const [dragging, setDragging] = useState(false);
	const [startCell, setStartCell] = useState<Cell | null>(null);
	const [highlightColor, setHighlightColor] = useState('bg-success-dark');
	const touchMoveRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const newGrid = Array.from({ length: 24 }, (_, hour) =>
			Array.from({ length: 7 }, (_, day) => ({
				day,
				hour,
				selected: value[days[day].id.toLowerCase() as keyof OpeningHours].some(
					(timeframe) =>
						timeframe.start.hours <= hour && timeframe.end.hours > hour
				),
				highlighted: false,
			}))
		);

		// Check if the grid needs to be updated
		const gridNeedsUpdate = grid.some((row, hourIndex) =>
			row.some(
				(cell, dayIndex) =>
					cell.selected !== newGrid[hourIndex][dayIndex].selected
			)
		);

		if (gridNeedsUpdate) {
			setGrid(newGrid);
		}
	}, [value]);

	const handleStart = (day: number, hour: number) => {
		if (readOnly) return;

		const cell = grid[hour][day];
		setStartCell(cell);
		setHighlightColor(cell.selected ? 'bg-gray-100' : 'bg-success');
		setDragging(true);
	};

	const handleEnd = () => {
		if (readOnly) return;

		setDragging(false);
		if (startCell) {
			const updatedGrid = grid.map((row) =>
				row.map((cell) =>
					cell.highlighted
						? { ...cell, selected: !startCell.selected, highlighted: false }
						: cell
				)
			);
			setGrid(updatedGrid);
			handleOnChange(updatedGrid);
		}
		setStartCell(null);
	};

	const handleMove = (day: number, hour: number) => {
		if (readOnly) return;

		if (dragging && startCell) {
			updateRectangle(startCell, { day, hour });
		}
	};

	const updateRectangle = (
		start: { day: number; hour: number },
		end: { day: number; hour: number }
	) => {
		const minDay = Math.min(start.day, end.day);
		const maxDay = Math.max(start.day, end.day);
		const minHour = Math.min(start.hour, end.hour);
		const maxHour = Math.max(start.hour, end.hour);

		setGrid((prevGrid) =>
			prevGrid.map((row, h) =>
				row.map((cell, d) => {
					if (h >= minHour && h <= maxHour && d >= minDay && d <= maxDay) {
						return { ...cell, highlighted: true };
					}
					return { ...cell, highlighted: false };
				})
			)
		);
	};

	const handleOnChange = (updatedGrid: Cell[][]) => {
		const newOpeningHours: OpeningHours = {
			monday: [],
			tuesday: [],
			wednesday: [],
			thursday: [],
			friday: [],
			saturday: [],
			sunday: [],
		};

		updatedGrid.forEach((row, hour) => {
			row.forEach((cell, day) => {
				if (cell.selected) {
					const dayName = days[day].id.toLowerCase() as keyof OpeningHours;
					const lastTimeframe =
						newOpeningHours[dayName][newOpeningHours[dayName].length - 1];

					if (
						lastTimeframe &&
						lastTimeframe.end.hours === hour &&
						lastTimeframe.end.minutes === 0
					) {
						lastTimeframe.end.hours = hour + 1;
					} else {
						newOpeningHours[dayName].push({
							start: { hours: hour, minutes: 0 },
							end: { hours: hour + 1, minutes: 0 },
						});
					}
				}
			});
		});

		onChange?.(newOpeningHours);
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		if (readOnly) return;

		e.preventDefault();

		const touch = e.touches[0];
		if (touchMoveRef.current) {
			const target = document.elementFromPoint(touch.clientX, touch.clientY);
			if (target instanceof HTMLElement) {
				const day = parseInt(target.dataset.day || '-1', 10);
				const hour = parseInt(target.dataset.hour || '-1', 10);
				if (!isNaN(day) && !isNaN(hour)) {
					handleMove(day, hour);
				}
			}
		}
	};

	return (
		<div
			className='overflow-x-auto select-none touch-none'
			ref={touchMoveRef}
			onTouchMove={handleTouchMove}
		>
			<table className='border-collapse border-white table-fixed font-normal text-xs'>
				<thead>
					<tr>
						<th className='p-2 border border-white'></th>
						{days.map((day, index) => (
							<th
								key={index}
								className='p-2 border border-white w-12 text-center font-normal'
							>
								{day.display}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{hours.map((hour, hourIndex) => (
						<tr key={hourIndex}>
							<td className='border-2 border-white text-center w-12'>{hour}</td>
							{grid[hourIndex].map((cell, dayIndex) => (
								<td
									key={dayIndex}
									className={twMerge(
										'p-2 border-2 border-white text-center cursor-pointer',
										cell.selected ? 'bg-success' : 'bg-gray-100',
										cell.highlighted ? highlightColor : '',
										dragging && 'cursor-crosshair',
										readOnly && 'cursor-default'
									)}
									onMouseDown={() => {
										handleStart(cell.day, cell.hour);
									}}
									onMouseUp={handleEnd}
									onMouseEnter={() => handleMove(cell.day, cell.hour)}
									data-day={cell.day}
									data-hour={cell.hour}
								></td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default OpeningHoursPicker;
