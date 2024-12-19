'use client';

import { useContext, useState } from 'react';
import { UserContext } from '@/client/contexts/user.context';
import { usePathname } from 'next/navigation';
import Card from '@/components/utils/Card';
import Icon from '@/components/utils/Icon';
import Logo from '@/components/Logo';
import Avatar from '@/components/utils/Avatar';
import { useFetch } from '@/client/hooks/utils/useFetch';
import { BusinessClientService } from '@/client/services/business.client-service';
import List2 from '@/components/utils/List2';
import ListItem, { ListItemProps } from '@/components/utils/ListItem';
import Separator from '@/components/utils/Separator';
import SidebarExtension from './SidebarExtension';
import { twMerge } from 'tailwind-merge';
import MenuButton from '../MenuButton';
import { BreakpointContext } from '@/client/contexts/breakpoint.context';
import Link from 'next/link';
import SignInForm from '@/components/auth/SignInForm';

function Sidebar() {
	const pathname = usePathname();

	const [extension, setExtensions] = useState('');

	const [user] = useContext(UserContext);
	const breakpoint = useContext(BreakpointContext);

	const { data: businesses } = useFetch([], {
		async fetch() {
			return await BusinessClientService.getAll({ staff: user?.id });
		},
	});

	const items: ListItemProps[] = [
		{
			prefix: <Icon name='discover' />,
			href: '/explore',
			selected: pathname === '/explore',
			children: 'Explore',
		},
		{
			prefix: <Icon name='message' />,
			selected: pathname === '/messages',
			onClick: () => setExtensions('messages'),
			children: 'Messages',
		},
		{
			prefix: <Icon name='todo' />,
			href: '/reservations',
			selected: pathname === '/reservations',
			children: 'Reservations',
		},
		{
			prefix: <Icon name='notification' />,
			selected: extension === 'notifications',
			onClick: () => setExtensions('notifications'),
			children: 'Notifications',
		},
	];

	const showText = !extension && !breakpoint?.isTablet;

	return (
		<Card
			className={twMerge(
				'h-full w-[300px] bg-white rounded-none p-0 border-y-transparent border-l-transparent',
				breakpoint?.isTablet && 'w-[72px]'
			)}
			bodyClassName={twMerge('relative size-full')}
		>
			<div className='absolute top-0 left-0 size-full flex'>
				<div
					className={twMerge(
						'flex flex-col size-full justify-between py-7 px-2',
						!showText && 'w-min'
					)}
				>
					<div className='space-y-7'>
						<div className='flex items-center gap-2 px-3'>
							<Link href='/'>
								<Logo showText={showText} />
							</Link>
						</div>

						{!user ? (
							<div className='pt-10 px-2'>
								<SignInForm compact />
							</div>
						) : (
							<List2>
								{...items.map((item) => (
									<ListItem {...item}>{showText && item.children}</ListItem>
								))}

								{user && (
									<>
										<Separator />

										<ListItem
											prefix={<Avatar src={user.avatar} size={24} />}
											href={`/users/${user.id}`}
											selected={pathname === `/users/${user.id}`}
										>
											{showText && user.name}
										</ListItem>

										{businesses.length > 0 && <Separator />}

										{...businesses.map((business) => (
											<ListItem
												prefix={
													<Avatar
														src={
															business.avatar ||
															'/images/avatar-placeholder.png'
														}
														size={24}
													/>
												}
												href={`/businesses/${business?.id}`}
												selected={pathname === `/businesses/${business?.id}`}
											>
												{showText && business.name}
											</ListItem>
										))}
									</>
								)}
							</List2>
						)}
					</div>

					{user && <MenuButton showText={showText} />}
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
