import React, { useState, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const hours = Array.from({ length: 24 }, (_, i) => i);

type Cell = {
	day: number;
	hour: number;
	selected: boolean;
	highlighted: boolean;
};

const OpeningHoursSelector: React.FC = () => {
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
	const touchMoveRef = useRef<HTMLDivElement>(null);

	const handleStart = (day: number, hour: number) => {
		setStartCell({
			day,
			hour,
			selected: grid[hour][day].selected,
			highlighted: false,
		});
		setDragging(true);
	};

	const handleEnd = () => {
		setDragging(false);
		if (startCell) {
			// Apply selection to all highlighted cells
			setGrid((prevGrid) =>
				prevGrid.map((row) =>
					row.map((cell) =>
						cell.highlighted
							? { ...cell, selected: !startCell.selected, highlighted: false }
							: cell
					)
				)
			);
		}
		setStartCell(null);
	};

	const handleMove = (day: number, hour: number) => {
		if (dragging && startCell) {
			updateRectangle(startCell, { day, hour });
		}
	};

	const toggleCell = (day: number, hour: number) => {
		setGrid((prevGrid) =>
			prevGrid.map((row, h) =>
				row.map((cell, d) =>
					h === hour && d === day ? { ...cell, selected: !cell.selected } : cell
				)
			)
		);
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

	const handleTouchMove = (e: React.TouchEvent) => {
		// Prevent default touch action to avoid scrolling
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
								{day}
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
										cell.highlighted ? 'bg-success-dark' : '',
										dragging ? 'cursor-crosshair' : 'cursor-pointer'
									)}
									onMouseDown={() => {
										handleStart(cell.day, cell.hour);
										toggleCell(cell.day, cell.hour);
									}}
									onMouseUp={handleEnd}
									onMouseEnter={() => handleMove(cell.day, cell.hour)}
									// onTouchStart={(e) => {
									// 	e.preventDefault(); // Prevent default to avoid accidental scrolling
									// 	handleStart(cell.day, cell.hour);
									// 	toggleCell(cell.day, cell.hour);
									// }}
									onClick={() => toggleCell(cell.day, cell.hour)}
									// onTouchEnd={handleEnd}
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

export default OpeningHoursSelector;
