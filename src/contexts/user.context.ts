import { User } from '@/types/user.interface';
import { createContext } from 'react';

export const UserContext = createContext<
	[User | null | undefined, (user: User | null | undefined) => void]
>([undefined, () => {}]);
