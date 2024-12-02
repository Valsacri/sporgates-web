'use client';

import { useParams, usePathname } from 'next/navigation';
import Card from '../utils/Card';
import Icon from '../utils/Icon';
import List from '../utils/List';
import { useContext } from 'react';
import { UserContext } from '@/client/contexts/user.context';

function BusinessSettingsNavigation() {
	const pathname = usePathname();
	const { businessId } = useParams();
	const [user] = useContext(UserContext);

	return (
		<Card className='p-1'>
			<List
				disable={!user}
				items={[
					{
						prefix: <Icon name='user-scan' />,
						item: 'Profile',
						href: `/businesses/${businessId}/settings/profile`,
					},
					{
						prefix: <Icon name='location' />,
						item: 'Address',
						href: `/businesses/${businessId}/settings/address`,
					},
					{
						prefix: <Icon name='two-user' />,
						item: 'Staff',
						href: `/businesses/${businessId}/settings/staff`,
					},
				].map((item) => ({
					...item,
					selected: pathname === item.href,
				}))}
			/>
		</Card>
	);
}

export default BusinessSettingsNavigation;
