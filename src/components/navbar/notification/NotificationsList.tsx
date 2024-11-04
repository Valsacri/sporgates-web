'use client';

import { useFetch } from '@/client/hooks/utils/useFetch';
import { NotificationClientService } from '@/client/services/notification.client-service';
import Avatar from '@/components/utils/Avatar';
import Card from '@/components/utils/Card';
import List from '@/components/utils/List';
import Loader from '@/components/utils/Loader';
import { DateHelper } from '@/helpers/datetime/date.helpers';
import Link from 'next/link';

function NotificationsList() {
	const { data: notifications, loading } = useFetch([], {
		async fetch() {
			return await NotificationClientService.getPage();
		},
	});

	return (
		<Card className='p-0 w-[350px]'>
			<h4 className='px-5 py-2'>Notifications</h4>

			{(loading || notifications.length > 0) && <hr className='mb-1' />}

			{loading ? (
				<div className='flex justify-center p-5'>
					<Loader className='size-10' />
				</div>
			) : (
				<List
					items={notifications.map((notification) => ({
						item: (
							<div className='w-full flex justify-between gap-3'>
								<Avatar
									src={notification.image!}
									size={60}
									className='flex-shrink-0'
								/>

								<div className='space-y-1'>
									<h5 className='truncate break-words text-text-secondary-dark'>
										{notification.title}
									</h5>

									<p className='text-sm line-clamp-3 text-text-secondary-dark'>
										{notification.description}
									</p>

									<div className='flex justify-between items-center text-xs text-text-secondary'>
										<div className='flex items-center gap-1.5'>
											{DateHelper.toElapsedTime(
												new Date(notification.createdAt)
											)}{' '}
											<div className='bg-text-secondary rounded-full size-0.5'></div>
											{notification.infos.join(', ')}
										</div>
										<div className='bg-info rounded-full size-3'></div>
									</div>
								</div>
							</div>
						),
						href: notification.url!,
						onClick() {
							console.log('All notifications');
						},
					}))}
				/>
			)}
		</Card>
	);
}

export default NotificationsList;
