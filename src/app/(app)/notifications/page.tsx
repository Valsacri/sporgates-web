import NotificationsList from '@/components/layout/navbar/notification/NotificationsList';
import Card from '@/components/utils/Card';
import Separator from '@/components/utils/Separator';
import React from 'react';

function page() {
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
