import { Record } from './utils.types';

export interface Sport extends Record {
	code: string;
	name: string;
	imageUrl: string;
}
