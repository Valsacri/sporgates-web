'use client';

import useBreakpoint from '@/hooks/utils/useBreakpoint';
import GroundReservationMobile from './GroundReservationMobile';
import GroundReservationDesktop from './GroundReservationDesktop';

function GroundReservation() {
	const { breakpointsSize, windowWidth } = useBreakpoint();

	return (
		<div className='sticky bottom-0 lg:top-0 left-0 w-full h-max pt-5 z-50'>
			{windowWidth < breakpointsSize.lg ? (
				<GroundReservationMobile />
			) : (
				<GroundReservationDesktop />
			)}
		</div>
	);
}

export default GroundReservation;
