'use client';

import { UserContext } from '@/client/contexts/user.context';
import { useContext } from 'react';

interface Props {
	children: React.ReactNode;
}

function UserGuard({ children }: Props) {
	const [user] = useContext(UserContext);

	return user && children;
}

export default UserGuard;
