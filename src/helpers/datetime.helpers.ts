import { OpeningHours } from '@/types/business.types';
import { Time, Timeframe } from '@/types/general.types';

export const generateTimes = (
	startTime: Time,
	endTime: Time,
	interval = 60
) => {
	const times: Time[] = [];

	for (let hour = startTime.hours; hour < endTime.hours; hour++) {
		for (let minute = 0; minute < 60; minute += interval) {
			times.push({ hours: hour, minutes: minute });
		}
	}

	return times;
};

export const generateTimeframes = (
	startHour: number,
	endHour: number,
	interval = 60
): Timeframe[] => {
	const timeframes: Timeframe[] = [];

	for (let hour = startHour; hour < endHour; hour++) {
		for (let minute = 0; minute < 60; minute += interval) {
			const endMinute = minute + interval;
			const endHourAdjusted = hour + Math.floor(endMinute / 60);

			const timeframe: Timeframe = {
				start: {
					hours: hour,
					minutes: minute,
				},
				end: {
					hours: endHourAdjusted,
					minutes: endMinute % 60,
				},
			};

			timeframes.push(timeframe);
		}
	}

	return timeframes;
};

export const formatTime = (time: Time) => {
	const { hours, minutes } = time;
	return `${hours.toString().padStart(2, '0')}:${minutes
		.toString()
		.padStart(2, '0')}`;
};

export const formatTimeframe = (timeframe: Timeframe) => {
	return `${formatTime(timeframe.start)} - ${formatTime(timeframe.end)}`;
};

export const timeframeToMinutes = (timeframe: Timeframe): number => {
	const { start, end } = timeframe;

	let duration =
		end.hours * 60 + end.minutes - (start.hours * 60 + start.minutes);

	if (duration < 0) {
		duration += 24 * 60; // handle overflow to the next day
	}

	return duration;
};

export const isTimeInTimeframe = (
	time: Time,
	timeframe: Timeframe
): boolean => {
	return isGteTime(time, timeframe.start) && isLteTime(time, timeframe.end);
};

export const isTimeframesEqual = (
	timeframe1: Timeframe,
	timeframe2: Timeframe
): boolean => {
	return (
		isTimesEqual(timeframe1.start, timeframe2.start) &&
		isTimesEqual(timeframe1.end, timeframe2.end)
	);
};

export const isTimesEqual = (time1: Time, time2: Time) => {
	return time1.hours === time2.hours && time1.minutes === time2.minutes;
};

export const isGteTime = (time1: Time, time2: Time) => {
	return (
		time1.hours > time2.hours ||
		(time1.hours === time2.hours && time1.minutes >= time2.minutes)
	);
};

export const isLteTime = (time1: Time, time2: Time) => {
	return (
		time1.hours < time2.hours ||
		(time1.hours === time2.hours && time1.minutes <= time2.minutes)
	);
};

export const isGtTime = (time1: Time, time2: Time) => {
	return (
		time1.hours > time2.hours ||
		(time1.hours === time2.hours && time1.minutes > time2.minutes)
	);
};

export const isLtTime = (time1: Time, time2: Time) => {
	return (
		time1.hours < time2.hours ||
		(time1.hours === time2.hours && time1.minutes < time2.minutes)
	);
};

/**
 * Helper function to check if two timeframes are consecutive (1 hour apart).
 */
const areConsecutive = (a: Timeframe, b: Timeframe): boolean => {
	// Check if the start of timeframeB is exactly 1 hour after the end of timeframeA
	return (
		a.end.hours + 1 === b.start.hours &&
		a.end.minutes === b.start.minutes
	);
};

/**
 * Merges consecutive timeframes for a given day.
 */
const mergeConsecutiveTimeframes = (timeframes: Timeframe[]): Timeframe[] => {
	if (timeframes.length === 0) return [];

	// Sort timeframes by start time to ensure we are merging in the correct order
	timeframes.sort((a, b) => {
		if (a.start.hours === b.start.hours) {
			return a.start.minutes - b.start.minutes;
		}
		return a.start.hours - b.start.hours;
	});

	const merged: Timeframe[] = [];
	let current = timeframes[0];

	for (let i = 1; i < timeframes.length; i++) {
		const next = timeframes[i];

		// If current timeframe is consecutive (1 hour apart) with the next one, merge them
		if (areConsecutive(current, next)) {
			current = { start: current.start, end: next.end };
		} else {
			// Otherwise, push the current timeframe and move to the next
			merged.push(current);
			current = next;
		}
	}

	// Don't forget to push the last timeframe
	merged.push(current);

	return merged;
};

/**
 * Simplifies the opening hours by merging consecutive timeframes for each day.
 */
export const simplifyOpeningHours = (
	openingHours: OpeningHours
): OpeningHours => {
	return {
		monday: mergeConsecutiveTimeframes(openingHours.monday),
		tuesday: mergeConsecutiveTimeframes(openingHours.tuesday),
		wednesday: mergeConsecutiveTimeframes(openingHours.wednesday),
		thursday: mergeConsecutiveTimeframes(openingHours.thursday),
		friday: mergeConsecutiveTimeframes(openingHours.friday),
		saturday: mergeConsecutiveTimeframes(openingHours.saturday),
		sunday: mergeConsecutiveTimeframes(openingHours.sunday),
	};
};

export const minutesToTime = (minutes: number) => {
	const hours = Math.floor(minutes / 60);
	const remainingMinutes = minutes % 60;

	return { hours, minutes: remainingMinutes } as Time;
};

export const formatDate = (date: Date) => {
	return date.toLocaleDateString('fr-FR');
};

export const parseDate = (date?: string) => {
	if (!date) {
		return new Date();
	}

	const [day, month, year] = date.split('/');
	return new Date(Number(year), Number(month) - 1, Number(day));
};
