import { UserClientService } from '@/client/services/user.client-service';
import { User } from '@/types/user.types';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

export function useUserListener() {
	const [user, setUser] = useState<User | null | undefined>();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(getAuth(), async (authUser) => {
			try {
				if (authUser) {
					const user = await UserClientService.getConnected();

					if (user) {
						setUser(user);
					} else {
						setUser(null);
					}
				} else {
					setUser(null);
				}
			} catch (error) {
				console.error('User listener failed:', error);
				setUser(null);
			}
		});
		return unsubscribe;
	}, []);

	return [user, setUser] as const;
}
