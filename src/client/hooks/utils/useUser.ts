import { UserService } from '@/server/services/ground.server-service';
import { User } from '@/types/user.types';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

export function useUser() {
	const [user, setUser] = useState<User | null | undefined>();

	useEffect(() => {
		onAuthStateChanged(getAuth(), async (authUser) => {
			if (authUser) {
				const user = await UserService.getOne(authUser.uid);
				setUser(user as any);
			} else {
				setUser(null);
			}
		});
	}, []);

	return [user, setUser] as const;
}
