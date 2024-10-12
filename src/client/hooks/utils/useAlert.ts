import { AlertMessage } from '@/client/contexts/alert.context';
import { useCallback, useState } from 'react';

export const useAlert = () => {
	const [alert, setAlert] = useState<AlertMessage | null>(null);

	const showAlert = useCallback((alert: AlertMessage | null) => {
		if (!alert) {
			setAlert(null);
			return;
		}
		setAlert(alert);
		setTimeout(() => {
			setAlert(null);
		}, 3000);
	}, []);

	return { alert, showAlert };
};
