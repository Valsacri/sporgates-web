import { Timeframe } from './general.types';

export interface OpeningHours {
	monday: Timeframe;
	tuesday: Timeframe;
	wednesday: Timeframe;
	thursday: Timeframe;
	friday: Timeframe;
	saturday: Timeframe;
	sunday: Timeframe;
}
