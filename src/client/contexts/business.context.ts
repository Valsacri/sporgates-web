import { Business } from '@/types/business.types';
import { createContext } from 'react';

export type BusinessContextType = Business | null;

export const BusinessContext = createContext<BusinessContextType>(null);
