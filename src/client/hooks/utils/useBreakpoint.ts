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

const useBreakpoint = () => {
	const innerWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
	const [windowWidth, setWindowWidth] = useState<number>(innerWidth);
	const [isDesktop, setIsDesktop] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(() => {
		if (windowWidth >= breakpointsSize.lg) {
			setIsDesktop(true);
		}
	}, [windowWidth]);

	const breakpoint = useMemo(() => {
		for (const breakpoint of breakpoints.reverse()) {
			if (windowWidth >= breakpointsSize[breakpoint]) {
				return breakpoint;
			}
		}
		return 'xs';
	}, [windowWidth]);

	return { windowWidth, breakpoint, breakpointsSize, isDesktop };
};

export default useBreakpoint;
