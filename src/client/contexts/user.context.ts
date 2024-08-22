import { User } from '@/types/user.types';
import { createContext } from 'react';

export type UserContextType = [User | null | undefined, (user: User) => void];

export const UserContext = createContext<UserContextType>([
	undefined,
	() => {},
]);
