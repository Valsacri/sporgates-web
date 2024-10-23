'use client';

import { AlertContext, AlertMessage } from '@/client/contexts/alert.context';
import { UserContext } from '@/client/contexts/user.context';
import { useAlert } from '@/client/hooks/utils/useAlert';
import { UserClientService } from '@/client/services/user.client-service';
import { User } from '@/types/user.types';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Alert } from './utils/Alert';
import Loader from './utils/Loader';

interface Props {
	children: React.ReactNode;
}

function ContextProvider({ children }: Props) {
	const router = useRouter();
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
				router.push('/sign-in');
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
