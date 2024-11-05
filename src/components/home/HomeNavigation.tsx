'use client';

import Card from '../utils/Card';
import Icon from '../utils/Icon';
import List from '../utils/List';
import { useContext } from 'react';
import { UserContext } from '@/client/contexts/user.context';
import { usePathname } from 'next/navigation';

function HomeNavigation() {
	const pathname = usePathname();
	const [user] = useContext(UserContext);

	return (
		<Card className='p-1'>
			<List
				disable={!user}
				items={[
					// {
					// 	prefix: <Icon name='home' />,
					// 	item: 'Home',
					// 	href: '/'
					// },
					{
						prefix: <Icon name='discover' />,
						item: 'Explore',
						href: '/explore',
					},
					// {
					// 	prefix: <Icon name='gallery' />,
					// 	item: 'Gallery',
					// 	href: `/users/${user?.id}/gallery`,
					// },
					// { prefix: <Icon name='saved' />, item: 'Saved posts' },
					// { prefix: <Icon name='report' />, item: 'My page' },
					// { prefix: <Icon name='bag' />, item: 'Market' },
					// { prefix: <Icon name='calendar' />, item: 'Events' },
					// { prefix: <Icon name='star' />, item: 'Offers' },
					// { prefix: <Icon name='user-plus' />, item: 'Find friends' },
					{
						prefix: <Icon name='document' />,
						item: 'Reservations',
						href: '/reservations',
					},
				].map((item) => ({
					...item,
					selected: pathname === item.href,
				}))}
			/>
		</Card>
	);
}

export default HomeNavigation;
