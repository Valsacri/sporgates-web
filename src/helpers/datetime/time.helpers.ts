import { Time } from '@/types/general.types';

export class TimeHelper {
	static generate(startTime: Time, endTime: Time, interval = 60) {
		const times: Time[] = [];

		for (let hour = startTime.hours; hour < endTime.hours; hour++) {
			for (let minute = 0; minute < 60; minute += interval) {
				times.push({ hours: hour, minutes: minute });
			}
		}

		return times;
	}

	static format(time: Time) {
		const { hours, minutes } = time;
		return `${hours.toString().padStart(2, '0')}:${minutes
			.toString()
			.padStart(2, '0')}`;
	}

	static isEquals(time1: Time, time2: Time) {
		return time1.hours === time2.hours && time1.minutes === time2.minutes;
	}

	static isGte(time1: Time, time2: Time) {
		return (
			time1.hours > time2.hours ||
			(time1.hours === time2.hours && time1.minutes >= time2.minutes)
		);
	}

	static isLte(time1: Time, time2: Time) {
		return (
			time1.hours < time2.hours ||
			(time1.hours === time2.hours && time1.minutes <= time2.minutes)
		);
	}

	static isGt(time1: Time, time2: Time) {
		return (
			time1.hours > time2.hours ||
			(time1.hours === time2.hours && time1.minutes > time2.minutes)
		);
	}

	static isLt(time1: Time, time2: Time) {
		return (
			time1.hours < time2.hours ||
			(time1.hours === time2.hours && time1.minutes < time2.minutes)
		);
	}

	static fromMinutes(minutes: number) {
		const hours = Math.floor(minutes / 60);
		const remainingMinutes = minutes % 60;

		return { hours, minutes: remainingMinutes } as Time;
	}
}
