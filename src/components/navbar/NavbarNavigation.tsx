'use client';

import Button from '../utils/Button';
import Dropdown from '../utils/Dropdown';
import Avatar from '../utils/Avatar';
import Icon from '../utils/Icon';
import List from '../utils/List';
import { useRouter } from 'next/navigation';
import { getAuth, signOut } from 'firebase/auth';

function NavbarNavigation() {
	const router = useRouter();

	return (
		<Dropdown
			closeOnClick
			containerClassName='h-full'
			triggerClassName='h-full'
			trigger={
				<Button className='h-full rounded-none space-x-1'>
					<Avatar
						src='https://sporgates.com/upload/photos/d-avatar.jpg?cache=0'
						size={30}
					/>
					<div className='hidden lg:flex items-center gap-1'>
						<div>Oussama Khalfi</div>
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
								size={20}
							/>
						),
						item: 'Oussama Khalfi',
						onClick: () => router.push('/page'),
					},
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
					null,
					// {
					// 	prefix: <Icon name='status' />,
					// 	item: 'Advertising',
					// },
					{
						prefix: <Icon name='dollar' />,
						item: 'Wallet: 530 DH',
						onClick: () => router.push('/wallet'),
					},
					null,
					// { prefix: <Icon name='edit' />, item: 'Edit' },
					{
						prefix: <Icon name='settings' />,
						item: 'General setting',
					},
					null,
					// {
					// 	prefix: <Icon name='menu' />,
					// 	item: 'Admin area',
					// },
					// null,
					{
						prefix: <Icon name='turn-off' />,
						item: 'Logout',
						onClick: () => signOut(getAuth()),
					},
					null,
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
