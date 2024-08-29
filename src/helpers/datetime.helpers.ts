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

export const timeframeToMinutes = (timeframe: Timeframe): number => {
	const { start, end } = timeframe;

	let duration =
		end.hours * 60 + end.minutes - (start.hours * 60 + start.minutes);

	if (duration < 0) {
		duration += 24 * 60; // handle overflow to the next day
	}

	return duration;
};

export const compareTimeframes = (
	timeframe1: Timeframe,
	timeframe2: Timeframe
): boolean => {
	return (
		timeframe1.start.hours === timeframe2.start.hours &&
		timeframe1.start.minutes === timeframe2.start.minutes &&
		timeframe1.end.hours === timeframe2.end.hours &&
		timeframe1.end.minutes === timeframe2.end.minutes
	);
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
