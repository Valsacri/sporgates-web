import { Club } from './item/club.types';
import { Ground } from './item/ground.types';
import { Item } from './item/item.types';
import { User } from './user.types';
import { Record } from './utils.types';

export enum OrderStatus {
	PENDING = 'pending',
	PROCESSING = 'processing',
	COMPLETED = 'completed',
	CANCELLED = 'cancelled',
}

export enum OrderSubject {
	reservation = 'RESERVATION',
	subscription = 'SUBSCRIPTION',
}

export interface OrderItem {
	item: string | Item;
	quantity: number;
}

export interface Order extends Record {
	items: OrderItem[];
	status: OrderStatus;
	subject: OrderSubject;
	amount: number;
	transaction: string | Transaction;
	ground: string | Ground | null;
	club: string | Club | null;
}

export enum TransactionStatus {
	PENDING = 'pending',
	SUCCESS = 'success',
	FAILED = 'failed',
}

export enum TransactionType {
	CREDIT = 'credit',
	DEBIT = 'debit',
}

export enum TransactionSubject {
	DEPOSIT = 'deposit',
	PURCHASE = 'purchase',
}

export interface Transaction extends Record {
	ref: string;
	amount: number;
	type: TransactionType;
	subject: TransactionSubject;
	status: TransactionStatus;
	sender: string | Wallet;
	receiver: string | Wallet | null;
}

export interface Wallet {
	balance: string;
	user: string | User;
}
