'use client';

import { BreakpointContext } from '@/client/contexts/breakpoint.context';
import NotificationsList from '@/components/layout/navbar/notification/NotificationsList';
import Card from '@/components/utils/Card';
import Separator from '@/components/utils/Separator';
import { redirect } from 'next/navigation';
import React, { useContext } from 'react';

function page() {
	const breakpoint = useContext(BreakpointContext);

	if (breakpoint?.isDesktop) {
		return redirect('/not-found');
	}

	return (
		<Card
			title={<span className='uppercase ml-4'>Notifications</span>}
			className='p-3'
		>
			<Separator />
			<NotificationsList />
		</Card>
	);
}

export default page;
