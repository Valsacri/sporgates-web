'use client';

import { AlertContext } from '@/client/contexts/alert.context';
import { UserContext } from '@/client/contexts/user.context';
import { useAlert } from '@/client/hooks/utils/useAlert';
import { Alert } from './utils/Alert';
import { initFirebaseApp } from '@/client/config/firebase.config';
import { useUserListener } from '@/client/hooks/utils/useUserListener';
import useBreakpoint from '@/client/hooks/utils/useBreakpoint';
import { BreakpointContext } from '@/client/contexts/breakpoint.context';
import Splash from './layout/Splash';

interface Props {
	children: React.ReactNode;
}

initFirebaseApp();

function ContextProvider({ children }: Props) {
	const [user, setUser] = useUserListener();
	const { alert, showAlert } = useAlert();
	const breakpoint = useBreakpoint();

	if (user === undefined || breakpoint.loading) {
		return <Splash />;
	}

	return (
		<UserContext.Provider value={[user, setUser]}>
			<AlertContext.Provider value={showAlert}>
				<BreakpointContext.Provider value={breakpoint}>
					{children}
					{alert && <Alert alert={alert} />}
				</BreakpointContext.Provider>
			</AlertContext.Provider>
		</UserContext.Provider>
	);
}

export default ContextProvider;
