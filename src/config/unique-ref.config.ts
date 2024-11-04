import { customAlphabet } from 'nanoid';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
export const uniqueRef = customAlphabet(alphabet, 5);
