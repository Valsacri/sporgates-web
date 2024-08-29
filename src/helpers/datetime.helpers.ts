import { Timeframe } from '@/types/general.types';

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
				from: {
					hours: hour,
					minutes: minute,
				},
				to: {
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
	const { from, to } = timeframe;

	let duration = to.hours * 60 + to.minutes - (from.hours * 60 + from.minutes);

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
		timeframe1.from.hours === timeframe2.from.hours &&
		timeframe1.from.minutes === timeframe2.from.minutes &&
		timeframe1.to.hours === timeframe2.to.hours &&
		timeframe1.to.minutes === timeframe2.to.minutes
	);
};

export const minutesToDuration = (minutes: number) => {
	const hours = Math.floor(minutes / 60);
	const remainingMinutes = minutes % 60;

	return { hours, minutes: remainingMinutes };
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
