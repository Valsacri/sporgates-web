import { createContext } from 'react';

export interface AlertMessage {
	color: 'success' | 'warning' | 'danger';
	message?: string;
	position?: 'left' | 'right';
}

export type AlertContextType = (alert: AlertMessage | null) => void;

export const AlertContext = createContext<AlertContextType>(() => {});
