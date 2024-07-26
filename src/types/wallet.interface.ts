import { Item } from './business.interface';
import { Record } from './general.interface';

export enum OrderStatus {
	PENDING = 'pending',
	PROCESSING = 'processing',
	COMPLETED = 'completed',
	CANCELLED = 'cancelled',
}

export interface OrderItem {
	item: string | Item | null;
	quantity: number;
}

export interface Order extends Record {
	items: OrderItem[];
	status: OrderStatus;
	amount: number;
	transaction: string | Transaction;
	
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
	TRANSFER = 'transfer',
	DEPOSIT = 'deposit',
	WITHDRAWAL = 'withdrawal',
}

export interface Transaction extends Record {
	amount: number;
	type: TransactionType;
	subject: TransactionSubject;
	status: TransactionStatus;
	sender: string | Wallet;
	receiver: string | Wallet;
	ref: string;
}

export interface Wallet {
	balance: string;
}
