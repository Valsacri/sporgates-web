import { Time, Timeframe } from '@/types/general.types';
import { Ground } from '@/types/item/ground/ground.types';
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
	setSelectedTimeframe: React.Dispatch<React.SetStateAction<Timeframe | null>>;

	handleDateChange: (date: Date) => void;
	handleTimeframeChange: (timeframe: Timeframe) => void;

	duration: Time;

	reservedTimeframes: Timeframe[];
	loadingReservedTimeframes: boolean;

	totalPrice: number;

	openBalancePopup: boolean;
	toggleBalancePopup: () => void;
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
		setSelectedTimeframe: () => {},
		handleDateChange: () => {},
		handleTimeframeChange: () => {},
		duration: { hours: 0, minutes: 0 },
		reservedTimeframes: [],
		loadingReservedTimeframes: false,
		totalPrice: 0,
		openBalancePopup: false,
		toggleBalancePopup: () => {},
	});
