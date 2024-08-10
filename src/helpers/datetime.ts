export const generateTimeFrames = (
	startHour: number,
	endHour: number,
	interval = 60
) => {
	const timeFrames = [];

	for (let hour = startHour; hour < endHour; hour++) {
		for (let minute = 0; minute < 60; minute += interval) {
			const startTime = `${hour.toString().padStart(2, '0')}:${minute
				.toString()
				.padStart(2, '0')}`;
			const endMinute = minute + interval;
			const endHourAdjusted = hour + Math.floor(endMinute / 60);
			const endTime = `${endHourAdjusted.toString().padStart(2, '0')}:${(
				endMinute % 60
			)
				.toString()
				.padStart(2, '0')}`;
			const timeFrame = `${startTime} - ${endTime}`;
			timeFrames.push(timeFrame);
		}
	}

	return timeFrames;
};