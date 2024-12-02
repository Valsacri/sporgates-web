'use client';

import { usePathname } from 'next/navigation';
import Card from '../utils/Card';
import Icon from '../utils/Icon';
import List from '../utils/List';
import { useContext } from 'react';
import { UserContext } from '@/client/contexts/user.context';

function SettingsNavigation() {
	const pathname = usePathname();
	const [user] = useContext(UserContext);

	return (
		<Card className='p-1'>
			<List
				disable={!user}
				items={[
					// {
					// 	prefix: <Icon name='settings' />,
					// 	item: 'General',
					// 	href: '/settings/general',
					// },
					{
						prefix: <Icon name='user-scan' />,
						item: 'Profile',
						href: '/settings/profile',
					},
					{
						prefix: <Icon name='location' />,
						item: 'Address',
						href: '/settings/address',
					},
					{
						prefix: <Icon name='shield-check' />,
						item: 'Security',
						href: '/settings/security',
					},
					// {
					// 	prefix: <Icon name='wallet' />,
					// 	item: 'Wallet',
					// 	// href: '/settings/wallet',
					// },
				].map((item) => ({
					...item,
					selected: pathname === item.href,
				}))}
			/>
		</Card>
	);
}

export default SettingsNavigation;
