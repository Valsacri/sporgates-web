import { Timeframe } from '@/types/general.types';

export const generateTimeFrames = (
	startHour: number,
	endHour: number,
	interval = 60
): Timeframe[] => {
	const timeFrames: Timeframe[] = [];

	for (let hour = startHour; hour < endHour; hour++) {
		for (let minute = 0; minute < 60; minute += interval) {
			const endMinute = minute + interval;
			const endHourAdjusted = hour + Math.floor(endMinute / 60);

			const timeFrame: Timeframe = {
				from: {
					hours: hour,
					minutes: minute,
				},
				to: {
					hours: endHourAdjusted,
					minutes: endMinute % 60,
				},
			};

			timeFrames.push(timeFrame);
		}
	}

	return timeFrames;
};

export const timeFrameToMinutes = (timeFrame: Timeframe): number => {
	const { from, to } = timeFrame;

	let duration = to.hours * 60 + to.minutes - (from.hours * 60 + from.minutes);

	if (duration < 0) {
		duration += 24 * 60; // handle overflow to the next day
	}

	return duration;
};

export const compareTimeFrames = (
	timeFrame1: Timeframe,
	timeFrame2: Timeframe
): boolean => {
	return (
		timeFrame1.from.hours === timeFrame2.from.hours &&
		timeFrame1.from.minutes === timeFrame2.from.minutes &&
		timeFrame1.to.hours === timeFrame2.to.hours &&
		timeFrame1.to.minutes === timeFrame2.to.minutes
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
