'use client';

import { useFetch } from '@/client/hooks/utils/useFetch';
import Avatar from '@/components/utils/Avatar';
import Card from '@/components/utils/Card';
import List from '@/components/utils/List';

const timeElapsed = (date: Date) => {
	const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
	let interval = seconds / 31536000;

	if (interval > 1) {
		return Math.floor(interval) + ' years ago';
	}
	interval = seconds / 2592000;
	if (interval > 1) {
		return Math.floor(interval) + ' months ago';
	}
	interval = seconds / 86400;
	if (interval > 1) {
		return Math.floor(interval) + ' days ago';
	}
	interval = seconds / 3600;
	if (interval > 1) {
		return Math.floor(interval) + ' hours ago';
	}
	interval = seconds / 60;
	if (interval > 1) {
		return Math.floor(interval) + ' minutes ago';
	}
	return Math.floor(seconds) + ' seconds ago';
};

function NotificationsList() {
	const { data: notifications, loading } = useFetch([], {
		async fetch() {
			return [
				{
					id: 1,
					title: 'New reservation',
					description: 'City Foot received a new reservation for "Ground 1".',
					createdAt: 1728734169906,
				},
				{
					id: 2,
					title: 'New reservation',
					description: 'City Foot received a new reservation for "Ground 1".',
					createdAt: 1728734169906,
				},
				{
					id: 3,
					title: 'New reservation',
					description: 'City Foot received a new reservation for "Ground 1".',
					createdAt: 1728734169906,
				},
				{
					id: 4,
					title: 'New reservation',
					description: 'City Foot received a new reservation for "Ground 1".',
					createdAt: 1728734169906,
				},
			];
		},
	});

	return (
		<Card className='p-0 max-w-[350px]'>
			<h4 className='px-5 py-2'>Notifications</h4>
			<hr />
			<List
				items={notifications.map((notification) => ({
					item: (
						<div className='flex justify-between gap-4'>
							<Avatar
								src={'/images/placeholder.png'}
								size={60}
								className='flex-shrink-0'
							/>

							<div className='w-[238px] space-y-1'>
								<h5 className='truncate break-words'>{notification.title}</h5>

								<p className='text-sm line-clamp-2'>
									{notification.description}
								</p>

								<div className='flex justify-between items-center text-xs text-text-secondary'>
									{timeElapsed(new Date(notification.createdAt))}
									<div className='bg-info rounded-full size-3'></div>
								</div>
							</div>
						</div>
					),
					onClick() {
						console.log('All notifications');
					},
				}))}
			/>
		</Card>
	);
}

export default NotificationsList;
