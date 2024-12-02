import { User } from './user.types';

export interface Record {
	id: string;

	createdAt: number;
	updatedAt?: number | null;
	deletedAt?: number | null;

	createdBy: string | User | null;
	updatedBy?: string | User | null;
	deletedBy?: string | User | null;
}

export type Create<T> = Omit<T, keyof Record> & Partial<Record>;
export type Update<T> = Partial<Create<T>>;
