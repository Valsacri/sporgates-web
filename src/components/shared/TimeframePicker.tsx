'use client';

import Button from '@/components/utils/Button';
import { twMerge } from 'tailwind-merge';
import { useMemo, useState } from 'react';
import { Timeframe, Time } from '@/types/general.types';
import { TimeframeHelper } from '@/helpers/datetime/timeframe.helpers';
import { TimeHelper } from '@/helpers/datetime/time.helpers';

interface Props {
	startTime: Time;
	endTime: Time;
	interval: number;
	buttonClassName?: string;
	containerClassName?: string;
	value?: Timeframe | null;
	onChange?: (timeframe: Timeframe, time?: Time) => void;
	disabledTimeframes?: Timeframe[];
}

function TimeFramePicker({
	startTime,
	endTime,
	interval,
	buttonClassName,
	containerClassName,
	value,
	onChange,
	disabledTimeframes = [],
}: Props) {
	const timeframes = useMemo(() => {
		const timeframes = TimeframeHelper.generate(
			startTime.hours,
			endTime.hours,
			interval
		);

		return timeframes.map((timeframe) => ({
			disabled: disabledTimeframes.some((_timeframe) =>
				TimeframeHelper.includesTimeframe(_timeframe, timeframe)
			),
			...timeframe,
		}));
	}, [startTime, endTime, interval, disabledTimeframes]);

	const [initStartIndex, initEndIndex] = useMemo(() => {
		let initStartIndex = -1;
		let initEndIndex = -1;

		if (value?.start && value?.end) {
			initStartIndex = timeframes.findIndex((timeframe) =>
				TimeHelper.isEqual(timeframe.start, value.start!)
			);
			initEndIndex = timeframes.findIndex((timeframe) =>
				TimeHelper.isEqual(timeframe.end, value.end!)
			);
		}

		return [initStartIndex, initEndIndex];
	}, [value]);

	const [startIndex, setStartIndex] = useState<number>(initStartIndex);
	const [endIndex, setEndIndex] = useState<number>(initEndIndex);

	const handleClick = (index: number, _timeframe: Timeframe) => {
		if (
			disabledTimeframes.some((__timeframe) =>
				TimeframeHelper.isEqual(__timeframe, _timeframe)
			)
		) {
			return;
		}

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

	// Disable buttons that cannot be part of the selection due to unavailable timeframes
	const isButtonDisabled = (index: number) => {
		if (startIndex === -1 || (startIndex !== -1 && endIndex !== -1)) {
			// If no start has been selected, use the default disabled state
			return timeframes[index].disabled;
		}

		// If a start timeframe has been selected, disable any buttons where a disabled timeframe exists between the current timeframe and the start
		const minIndex = Math.min(startIndex, index);
		const maxIndex = Math.max(startIndex, index);

		return timeframes
			.slice(minIndex, maxIndex + 1)
			.some((timeframe) => timeframe.disabled);
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
						disabled={isButtonDisabled(index)}
						className={twMerge(
							buttonClassName,
							timeframe.disabled && 'cursor-not-allowed opacity-50',
							startIndex === index &&
								endIndex === -1 &&
								'hover:bg-secondary hover:text-primary'
						)}
						onClick={() => !timeframe.disabled && handleClick(index, timeframe)}
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
