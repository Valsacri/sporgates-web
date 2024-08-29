'use client';

import Button from '@/components/utils/Button';
import { twMerge } from 'tailwind-merge';
import { useMemo, useState } from 'react';
import { Time, Timeframe } from '@/types/general.types';
import { generateTimes } from '@/helpers/datetime.helpers';

interface Props {
	startTime: Time;
	endTime: Time;
	interval: number;
	buttonClassName?: string;
	containerClassName?: string;
	onChange?: (timeframe: Timeframe, time?: Time) => void;
}

function TimeFramePicker({
	startTime,
	endTime,
	interval,
	buttonClassName,
	containerClassName,
	onChange,
}: Props) {
	const [startIndex, setStartIndex] = useState<number>(-1);
	const [endIndex, setEndIndex] = useState<number>(-1);

	const times = useMemo(
		() => generateTimes(startTime, endTime, interval),
		[startTime, endTime, interval]
	);

	const handleClick = (time: Time, index: number) => {
		if (startIndex === -1 || endIndex !== -1) {
			setStartIndex(index);
			setEndIndex(-1);
			return;
		}

		if (index < startIndex) {
			setStartIndex(index);
			return;
		}

		if (index === startIndex) {
			setStartIndex(-1);
			return;
		}

		setEndIndex(index);

		const timeframe: Timeframe = {
			start: times[startIndex || 0],
			end: times[index],
		};

		onChange?.(timeframe, time);
	};

	const isSelected = (index: number) =>
		(startIndex <= index && endIndex >= index) || startIndex === index;

	return (
		<div className={twMerge('flex gap-2', containerClassName)}>
			{times.map((time, index) => (
				<Button
					key={index}
					color={isSelected(index) ? 'primary' : 'secondary'}
					variant={
						startIndex === index && endIndex === -1 ? 'outlined' : 'filled'
					}
					className={twMerge(buttonClassName)}
					onClick={() => handleClick(time, index)}
				>
					{`${time.hours.toString().padStart(2, '0')}:${time.minutes
						.toString()
						.padStart(2, '0')}`}
				</Button>
			))}
		</div>
	);
}

export default TimeFramePicker;
