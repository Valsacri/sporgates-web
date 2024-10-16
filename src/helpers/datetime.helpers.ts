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
	return `${hours.toString().padStart(2, '0')}h${minutes
		.toString()
		.padStart(2, '0')}min`;
};

export const formatTimeframe = (timeframe: Timeframe) => {
	return `${formatTime(timeframe.start)} - ${formatTime(timeframe.end)}`;
};

export const timeframeToMinutes = (timeframe: Timeframe) => {
	const { start, end } = timeframe;

	let duration =
		end.hours * 60 + end.minutes - (start.hours * 60 + start.minutes);

	if (duration < 0) {
		duration += 24 * 60; // handle overflow to the next day
	}

	return duration;
};

export const timeframeToTime = (timeframe: Timeframe) => {
	const minutes = timeframeToMinutes(timeframe);
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
