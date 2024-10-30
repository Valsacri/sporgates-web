'use client';

import { AlertContext } from '@/client/contexts/alert.context';
import { UserContext } from '@/client/contexts/user.context';
import { useAlert } from '@/client/hooks/utils/useAlert';
import { Alert } from './utils/Alert';
import { initFirebaseApp } from '@/client/config/firebase.config';
import { useUserListener } from '@/client/hooks/utils/useUserListener';

interface Props {
	children: React.ReactNode;
}

initFirebaseApp();

function ContextProvider({ children }: Props) {
	const [user, setUser] = useUserListener();
	const { alert, showAlert } = useAlert();

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
