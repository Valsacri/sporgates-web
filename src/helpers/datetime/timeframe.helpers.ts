import { OpeningHours } from '@/types/business.types';
import { Time, Timeframe } from '@/types/general.types';
import { TimeHelper } from './time.helpers';

export class TimeframeHelper {
	static generate(
		startHour: number,
		endHour: number,
		interval = 60
	): Timeframe[] {
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
	}

	static formatTimeframe(timeframe: Timeframe) {
		return `${TimeHelper.format(timeframe.start)} - ${TimeHelper.format(
			timeframe.end
		)}`;
	}

	static timeframeToMinutes(timeframe: Timeframe): number {
		const { start, end } = timeframe;

		let duration =
			end.hours * 60 + end.minutes - (start.hours * 60 + start.minutes);

		if (duration < 0) {
			duration += 24 * 60; // handle overflow to the next day
		}

		return duration;
	}

	static isTimeInTimeframe(time: Time, timeframe: Timeframe) {
		return (
			TimeHelper.isGte(time, timeframe.start) &&
			TimeHelper.isLte(time, timeframe.end)
		);
	}

	static isTimeframesEqual(timeframe1: Timeframe, timeframe2: Timeframe) {
		return (
			TimeHelper.isEquals(timeframe1.start, timeframe2.start) &&
			TimeHelper.isEquals(timeframe1.end, timeframe2.end)
		);
	}

	/**
	 * Helper function to check if two timeframes are consecutive.
	 */
	areTimeframesConsecutive(a: Timeframe, b: Timeframe) {
		return a.end.hours === b.start.hours && a.end.minutes === b.start.minutes;
	}

	/**
	 * Merges consecutive timeframes for a given day.
	 */
	mergeConsecutiveTimeframes(timeframes: Timeframe[]) {
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

			// If current timeframe is consecutive with the next one, merge them
			if (this.areTimeframesConsecutive(current, next)) {
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
	}

	/**
	 * Simplifies the opening hours by merging consecutive timeframes for each day.
	 */
	simplifyOpeningHours(openingHours: OpeningHours): OpeningHours {
		return {
			monday: this.mergeConsecutiveTimeframes(openingHours.monday),
			tuesday: this.mergeConsecutiveTimeframes(openingHours.tuesday),
			wednesday: this.mergeConsecutiveTimeframes(openingHours.wednesday),
			thursday: this.mergeConsecutiveTimeframes(openingHours.thursday),
			friday: this.mergeConsecutiveTimeframes(openingHours.friday),
			saturday: this.mergeConsecutiveTimeframes(openingHours.saturday),
			sunday: this.mergeConsecutiveTimeframes(openingHours.sunday),
		};
	}
}
