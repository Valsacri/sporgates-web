import { Schema } from 'mongoose';
import { User } from './user.types';

export type Ref<T> = Schema.Types.ObjectId | T;

export interface Record {
	id: string;

	createdAt: number;
	updatedAt?: number;
	deletedAt?: number;

	createdBy: Ref<User>;
	updatedBy?: Ref<User>;
	deletedBy?: Ref<User>;
}

export type Create<T> = Omit<T, keyof Record> & Partial<Record>;
export type Update<T> = Partial<Create<T>>;
