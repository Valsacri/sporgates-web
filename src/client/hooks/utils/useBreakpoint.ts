'use client';

import { useState, useEffect, useMemo } from 'react';

const breakpointsSize = {
	xs: 0,
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	'2xl': 1536,
} as const;

type Breakpoint = keyof typeof breakpointsSize;

const breakpoints = Object.keys(breakpointsSize) as Breakpoint[];

export interface UseBreakpointReturnType {
	windowWidth: number;
	breakpoint: Breakpoint;
	breakpointsSize: typeof breakpointsSize;
	isDesktop: boolean;
	isLaptop: boolean;
	isTablet: boolean;
	isMobile: boolean;
}

const useBreakpoint = () => {
	const [windowWidth, setWindowWidth] = useState(0);

	useEffect(() => {
		setWindowWidth(window.innerWidth);
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const breakpoint = useMemo(() => {
		for (const breakpoint of breakpoints.reverse()) {
			if (windowWidth >= breakpointsSize[breakpoint]) {
				return breakpoint;
			}
		}
		return 'xs';
	}, [windowWidth]);

	const [isDesktop, isLaptop, isTablet, isMobile] = useMemo(() => {
		return [
			windowWidth >= breakpointsSize.xl,
			windowWidth < breakpointsSize.xl,
			windowWidth < breakpointsSize.lg,
			windowWidth < breakpointsSize.md,
		];
	}, [breakpoint]);

	if (!windowWidth) return null;

	return {
		windowWidth,
		breakpoint,
		breakpointsSize,
		isDesktop,
		isLaptop,
		isTablet,
		isMobile,
	} as UseBreakpointReturnType;
};

export default useBreakpoint;
