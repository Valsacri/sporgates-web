'use client';

import Button from '../utils/Button';
import Dropdown from '../utils/Dropdown';
import Avatar from '../utils/Avatar';
import Icon from '../utils/Icon';
import List from '../utils/List';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { UserContext } from '@/client/contexts/user.context';
import { AuthClientService } from '@/client/services/auth.client-service';
import { useFetch } from '@/client/hooks/utils/useFetch';
import { BusinessClientService } from '@/client/services/business.client-service';

function NavbarNavigation() {
	const [user] = useContext(UserContext);

	const router = useRouter();

	const { data: businesses } = useFetch([], {
		async fetch() {
			return await BusinessClientService.getAll({ user: user?.id });
		},
	});

	return (
		<Dropdown
			closeOnClick
			containerClassName='h-full'
			triggerClassName='h-full'
			className='w-60'
			trigger={
				<Button className='h-full rounded-none space-x-1'>
					<Avatar
						src='https://sporgates.com/upload/photos/d-avatar.jpg?cache=0'
						size={30}
					/>
					<div className='hidden lg:flex items-center gap-1'>
						<div>
							{user?.firstName} {user?.lastName}
						</div>
						<Icon name='arrow-bottom' />
					</div>
				</Button>
			}
		>
			<List
				items={[
					{
						prefix: (
							<Avatar
								src='https://sporgates.com/upload/photos/d-avatar.jpg?cache=0'
								size={24}
							/>
						),
						item: 'Oussama Khalfi',
						href: `/users/${user?.id}`,
					},
					...businesses.map((business) => ({
						prefix: (
							<Avatar
								src={business.logo || '/images/avatar-placeholder.png'}
								size={24}
							/>
						),
						item: business.name,
						href: `/businesses/${business?.id}`,
					})),
					// {
					// 	prefix: <Icon name='shield-check' />,
					// 	item: 'Manage subscription',
					// },
					// {
					// 	prefix: <Icon name='note' />,
					// 	item: 'Boosted posts',
					// },
					// {
					// 	prefix: <Icon name='report' />,
					// 	item: 'Boosted pages',
					// },
					{ separator: true },
					// {
					// 	prefix: <Icon name='status' />,
					// 	item: 'Advertising',
					// },
					// {
					// 	prefix: <Icon name='dollar' />,
					// 	item: 'Wallet: 530 DH',
					// 	onClick: () => router.push('/wallet'),
					// },
					// { separator: true },
					// { prefix: <Icon name='edit' />, item: 'Edit' },
					{
						prefix: <Icon name='settings2' />,
						item: 'Settings',
						href: '/settings',
					},
					{ separator: true },
					// {
					// 	prefix: <Icon name='menu' />,
					// 	item: 'Admin area',
					// },
					// null,
					{
						prefix: <Icon name='turn-off' />,
						item: 'Logout',
						onClick: async () => {
							await AuthClientService.signOut();
							router.push('/sign-in');
						},
					},
					{ separator: true },
					{
						item: 'Night mode',
						suffix: (
							<div className='rounded-full bg-secondary p-1 flex gap-1'>
								<Icon
									name='sun'
									className='bg-white p-1 rounded-full text-sm'
								/>
								<Icon name='moon' className='p-1 rounded-full text-sm' />
							</div>
						),
					},
				]}
			/>
		</Dropdown>
	);
}

export default NavbarNavigation;
