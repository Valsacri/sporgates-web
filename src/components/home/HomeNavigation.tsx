'use client';

import { useRouter } from 'next/navigation';
import Card from '../utils/Card';
import Icon from '../utils/Icon';
import List from '../utils/List';

function HomeNavigation() {
	const router = useRouter();

	return (
		<Card className='px-0 py-3'>
			<List
				items={[
					{
						prefix: <Icon name='home' />,
						item: 'Home',
						onClick() {
							router.push('/');
						},
					},
					{
						prefix: <Icon name='gallery' />,
						item: 'Gallery',
						onClick() {
							router.push('/gallery');
						},
					},
					{ prefix: <Icon name='saved' />, item: 'Saved posts' },
					{ prefix: <Icon name='report' />, item: 'My page' },
					{ prefix: <Icon name='bag' />, item: 'Market' },
					{
						prefix: <Icon name='discover' />,
						item: 'Explore',
						onClick() {
							router.push('/explore');
						},
					},
					{ prefix: <Icon name='calendar' />, item: 'Events' },
					{ prefix: <Icon name='star' />, item: 'Offers' },
					{ prefix: <Icon name='user-plus' />, item: 'Find friends' },
					{
						prefix: <Icon name='document' />,
						item: 'Reservations',
						onClick() {
							router.push('/reservations');
						},
					},
				]}
			/>
		</Card>
	);
}

export default HomeNavigation;
