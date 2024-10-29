import { Schema } from 'mongoose';
import { User } from './user.types';

export type Ref<T> = Schema.Types.ObjectId | T;

export interface Record {
	id: string;

	createdAt: number;
	updatedAt?: number | null;
	deletedAt?: number | null;

	createdBy: Ref<User> | null;
	updatedBy?: Ref<User> | null;
	deletedBy?: Ref<User> | null;
}

export type Create<T> = Omit<T, keyof Record> & Partial<Record>;
export type Update<T> = Partial<Create<T>>;
