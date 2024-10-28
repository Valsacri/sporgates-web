'use client';

import { AlertContext } from '@/client/contexts/alert.context';
import { UserContext } from '@/client/contexts/user.context';
import { useAlert } from '@/client/hooks/utils/useAlert';
import { User } from '@/types/user.types';
import { useEffect, useState } from 'react';
import { Alert } from './utils/Alert';
import { initFirebaseApp } from '@/client/config/firebase.config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { UserClientService } from '@/client/services/user.client-service';

interface Props {
	children: React.ReactNode;
}

initFirebaseApp();

function ContextProvider({ children }: Props) {
	const [user, setUser] = useState<User | null | undefined>(undefined);
	const { alert, showAlert } = useAlert();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(getAuth(), async (authUser) => {
			if (authUser) {
				const user = await UserClientService.getConnected();

				if (user) {
					setUser(user);
				}
			} else {
				setUser(null);
			}
		});
		return unsubscribe;
	}, []);

	return (
		<UserContext.Provider value={[user, setUser]}>
			<AlertContext.Provider value={showAlert}>
				{children}
				{alert && <Alert alert={alert} />}
			</AlertContext.Provider>
		</UserContext.Provider>
	);
}

export default ContextProvider;
