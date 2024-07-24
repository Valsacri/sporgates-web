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
	const [windowWidth, setWindowWidth] = useState<number>(0);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const breakpoint = useMemo(() => {
		for (const breakpoint of breakpoints.toReversed()) {
			if (windowWidth >= breakpointsSize[breakpoint]) {
				return breakpoint;
			}
		}
		return 'xs';
	}, [windowWidth]);

	return { windowWidth, breakpoint, breakpointsSize };
};

export default useBreakpoint;
