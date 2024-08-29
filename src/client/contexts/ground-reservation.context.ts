import { Timeframe } from '@/types/general.types';
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
	selectedTimes: Timeframe[];
	setSelectedTimes: React.Dispatch<React.SetStateAction<Timeframe[]>>;

	handleDateChange: (date: Date) => void;
	handleTimesChange: (timeframe: Timeframe) => void;

	getTileClassName: (data: any) => any;

	hours: number;
	minutes: number;
	times: {
		text: string;
		onClick: () => void;
		disabled: boolean;
		selected: boolean;
	}[];
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
		selectedTimes: [],
		setSelectedTimes: () => {},
		handleDateChange: () => {},
		handleTimesChange: () => {},
		getTileClassName: () => {},
		hours: 0,
		minutes: 0,
		times: [],
	});
