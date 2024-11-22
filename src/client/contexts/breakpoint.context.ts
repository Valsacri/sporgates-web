import { createContext } from 'react';
import { UseBreakpointReturnType } from '../hooks/utils/useBreakpoint';

export const BreakpointContext = createContext<UseBreakpointReturnType>({
	loading: true,
} as UseBreakpointReturnType);
