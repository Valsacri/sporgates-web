'use client';

import { usePathname, useRouter } from 'next/navigation';
import Card from '../utils/Card';
import Icon from '../utils/Icon';
import List from '../utils/List';
import { useContext } from 'react';
import { UserContext } from '@/client/contexts/user.context';

function SettingsNavigation() {
	const pathname = usePathname();
	const [user] = useContext(UserContext);

	if (!user) return null;

	return (
		<Card className='p-1'>
			<List
				items={[
					{
						prefix: <Icon name='settings' />,
						item: 'General',
						href: '/settings/general',
						selected: pathname === '/settings/general',
					},
					{
						prefix: <Icon name='user-scan' />,
						item: 'Profile',
						href: '/settings/profile',
						selected: pathname === '/settings/profile',
					},
					{
						prefix: <Icon name='location' />,
						item: 'Addresses',
						href: '/settings/addresses',
						selected: pathname === '/settings/addresses',
					},
					{
						prefix: <Icon name='shield-check' />,
						item: 'Security',
						href: '/settings/security',
						selected: pathname === '/settings/security',
					},
				]}
			/>
		</Card>
	);
}

export default SettingsNavigation;
