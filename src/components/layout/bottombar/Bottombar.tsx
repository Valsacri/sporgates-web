'use client';

import { UserContext } from '@/client/contexts/user.context';
import Card from '@/components/utils/Card';
import Icon from '@/components/utils/Icon';
import List2 from '@/components/utils/List2';
import ListItem, { ListItemProps } from '@/components/utils/ListItem';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';

function Bottombar() {
	const pathname = usePathname();
	const [user] = useContext(UserContext);

	const items: ListItemProps[] = [
		{
			prefix: <Icon name='todo' />,
			href: '/reservations',
			selected: pathname === '/reservations',
		},
		{
			prefix: <Icon name='message' />,
			href: '/messages',
			selected: pathname === '/messages',
		},
		{
			prefix: <Icon name='discover' />,
			href: '/explore',
			selected: pathname === '/explore',
		},
		{
			prefix: <Icon name='notification' />,
			selected: pathname === '/notifications',
			href: '/notifications',
		},
		{
			prefix: <Icon name='user' />,
			href: `/users/${user?.id}`,
			selected: pathname === `/users/${user?.id}`,
			disabled: !user,
		},
	];

	return (
		<Card className='fixed bottom-0 w-full z-40 p-0 rounded-none'>
			<List2 horizontal className='p-1'>
				{items.map((item, index) => (
					<ListItem key={index} {...item} className='justify-center' />
				))}
			</List2>
		</Card>
	);
}

export default Bottombar;
