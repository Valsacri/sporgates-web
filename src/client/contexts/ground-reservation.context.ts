import { Time, Timeframe } from '@/types/general.types';
import { Ground } from '@/types/item/ground.types';
import { createContext } from 'react';

export type GroundReservationContextType = {
	ground: Ground;

	openDatePicker: boolean;
	setOpenDatePicker: React.Dispatch<React.SetStateAction<boolean>>;
	openTimesPicker: boolean;
	setOpenTimesPicker: React.Dispatch<React.SetStateAction<boolean>>;

	selectedDate: Date;
	setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
	selectedTimeframe: Timeframe | null;

	handleDateChange: (date: Date) => void;
	handleTimeframeChange: (timeframe: Timeframe) => void;

	getTileClassName: (data: any) => any;

	duration: Time;
	setDuration: React.Dispatch<React.SetStateAction<Time>>;
};

export const GroundReservationContext =
	createContext<GroundReservationContextType>({
		ground: {} as Ground,
		openDatePicker: false,
		setOpenDatePicker: () => {},
		openTimesPicker: false,
		setOpenTimesPicker: () => {},
		selectedDate: new Date(),
		setSelectedDate: () => {},
		selectedTimeframe: null,
		handleDateChange: () => {},
		handleTimeframeChange: () => {},
		getTileClassName: () => {},
		duration: { hours: 0, minutes: 0 },
		setDuration: () => {},
	});
