'use client';

import { UserContext } from '@/client/contexts/user.context';
import { UserClientService } from '@/client/services/user.client-service';
import { User } from '@/types/user.types';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Props {
	children: React.ReactNode;
}

function ContextProvider({ children }: Props) {
	const router = useRouter();
	const [user, setUser] = useState<User | null | undefined>(null);

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
			{children}
		</UserContext.Provider>
	);
}

export default ContextProvider;
