'use client';

import Button from '@/components/utils/Button';
import { twMerge } from 'tailwind-merge';
import { useMemo, useState } from 'react';
import { Timeframe, Time } from '@/types/general.types';
import { isTimesEqual, generateTimeframes } from '@/helpers/datetime.helpers';

interface Props {
	startTime: Time;
	endTime: Time;
	interval: number;
	buttonClassName?: string;
	containerClassName?: string;
	value?: Timeframe | null;
	onChange?: (timeframe: Timeframe, time?: Time) => void;
}

function TimeFramePicker({
	startTime,
	endTime,
	interval,
	buttonClassName,
	containerClassName,
	value,
	onChange,
}: Props) {
	const timeframes = useMemo(
		() => generateTimeframes(startTime.hours, endTime.hours, interval),
		[startTime, endTime, interval]
	);

	const [initStartIndex, initEndIndex] = useMemo(() => {
		let initStartIndex = -1;
		let initEndIndex = -1;

		if (value?.start && value?.end) {
			initStartIndex = timeframes.findIndex((timeframe) =>
				isTimesEqual(timeframe.start, value.start!)
			);
			initEndIndex = timeframes.findIndex((timeframe) =>
				isTimesEqual(timeframe.end, value.end!)
			);
		}

		return [initStartIndex, initEndIndex];
	}, []);

	const [startIndex, setStartIndex] = useState<number>(initStartIndex);
	const [endIndex, setEndIndex] = useState<number>(initEndIndex);

	const handleClick = (index: number) => {
		if (startIndex === -1 || endIndex !== -1) {
			// Start a new selection
			setStartIndex(index);
			setEndIndex(-1);
			return;
		}

		if (index === startIndex) {
			// If the user clicks the same button twice, select the single timeframe
			if (endIndex === -1) {
				setEndIndex(index);
				const timeframe: Timeframe = {
					start: timeframes[startIndex].start,
					end: timeframes[index].end,
				};
				onChange?.(timeframe, timeframes[index].start);
			} else {
				// Deselect the current selection
				setStartIndex(-1);
				setEndIndex(-1);
			}
			return;
		}

		// Set the end index, ensuring startIndex is always less than or equal to endIndex
		if (index < startIndex) {
			setEndIndex(startIndex);
			setStartIndex(index);
		} else {
			setEndIndex(index);
		}

		const timeframe: Timeframe = {
			start: timeframes[Math.min(startIndex, index)].start,
			end: timeframes[Math.max(startIndex, index)].end,
		};

		onChange?.(timeframe, timeframes[index].start);
	};

	const isSelected = (index: number) => {
		return (startIndex <= index && endIndex >= index) || startIndex === index;
	};

	return (
		<div>
			<div className={twMerge('flex gap-2', containerClassName)}>
				{timeframes.map((timeframe, index) => (
					<Button
						key={index}
						color={isSelected(index) ? 'primary' : 'secondary'}
						variant={
							startIndex === index && endIndex === -1 ? 'outlined' : 'filled'
						}
						className={twMerge(
							buttonClassName,
							startIndex === index && endIndex === -1
								? 'hover:bg-secondary hover:text-primary'
								: ''
						)}
						onClick={() => handleClick(index)}
					>
						{`${timeframe.start.hours
							.toString()
							.padStart(2, '0')}:${timeframe.start.minutes
							.toString()
							.padStart(2, '0')} - ${timeframe.end.hours
							.toString()
							.padStart(2, '0')}:${timeframe.end.minutes
							.toString()
							.padStart(2, '0')}`}
					</Button>
				))}
			</div>
		</div>
	);
}

export default TimeFramePicker;
