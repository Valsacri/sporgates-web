'use client';

import { useContext, useRef, useState } from 'react';
import { UserContext } from '@/client/contexts/user.context';
import { usePathname, useRouter } from 'next/navigation';
import Card from '@/components/utils/Card';
import Icon from '@/components/utils/Icon';
import Logo from '@/components/Logo';
import Avatar from '@/components/utils/Avatar';
import { useFetch } from '@/client/hooks/utils/useFetch';
import { BusinessClientService } from '@/client/services/business.client-service';
import Dropdown from '@/components/utils/Dropdown';
import { AuthClientService } from '@/client/services/auth.client-service';
import List2 from '@/components/utils/List2';
import ListItem from '@/components/utils/ListItem';
import Separator from '@/components/utils/Separator';
import { useToggler } from '@/client/hooks/utils/useToggler';
import SidebarExtension from './SidebarExtension';
import { twMerge } from 'tailwind-merge';
import { useOutsideClick } from '@/client/hooks/utils/useOutsideClick';
import MenuButton from '../MenuButton';

function Sidebar() {
	const router = useRouter();
	const pathname = usePathname();

	const [extension, setExtensions] = useState('');

	const [user] = useContext(UserContext);

	const { data: businesses } = useFetch([], {
		async fetch() {
			return await BusinessClientService.getAll({ user: user?.id });
		},
	});

	return (
		<Card
			className={twMerge('h-full w-[300px] bg-white rounded-none p-0')}
			bodyClassName={twMerge('relative size-full')}
		>
			<div className='absolute top-0 left-0 size-full flex'>
				<div
					className={twMerge(
						'flex flex-col size-full justify-between py-7 px-2',
						extension && 'w-min'
					)}
				>
					<div className='space-y-7'>
						<div className='flex items-center gap-2 px-3'>
							<Logo />
							{!extension && <h4>Sporgates</h4>}
						</div>

						<List2>
							<ListItem
								prefix={<Icon name='search' />}
								onClick={() => setExtensions('search')}
							>
								{!extension && 'Search'}
							</ListItem>
							<ListItem
								prefix={<Icon name='discover' />}
								href='/explore'
								selected={pathname === '/explore'}
							>
								{!extension && 'Explore'}
							</ListItem>
							<ListItem
								prefix={<Icon name='message' />}
								selected={pathname === '/messages'}
								onClick={() => setExtensions('messages')}
							>
								{!extension && 'Messages'}
							</ListItem>
							<ListItem
								prefix={<Icon name='todo' />}
								href='/reservations'
								selected={pathname === '/reservations'}
							>
								{!extension && 'Reservations'}
							</ListItem>
							<ListItem
								prefix={<Icon name='notification' />}
								selected={pathname === '/notifications'}
								onClick={() => setExtensions('notifications')}
							>
								{!extension && 'Notifications'}
							</ListItem>
							<Separator />
							<ListItem
								prefix={
									<Avatar
										src='https://sporgates.com/upload/photos/d-avatar.jpg?cache=0'
										size={24}
									/>
								}
								href={`/users/${user?.id}`}
								selected={pathname === `/users/${user?.id}`}
							>
								{!extension && user?.name}
							</ListItem>
							{...businesses.map((business) => (
								<ListItem
									prefix={
										<Avatar
											src={business.avatar || '/images/avatar-placeholder.png'}
											size={24}
										/>
									}
									href={`/businesses/${business?.id}`}
									selected={pathname === `/businesses/${business?.id}`}
								>
									{!extension && business.name}
								</ListItem>
							))}
						</List2>
					</div>

					<MenuButton showText={!extension} />
				</div>

				{extension && (
					<SidebarExtension
						extension={extension}
						onOutsideClick={() => setExtensions('')}
					/>
				)}
			</div>
		</Card>
	);
}

export default Sidebar;
