'use client';

import Link from 'next/link';
import Logo from '../../Logo';
import Card from '@/components/utils/Card';
import MenuButton from '../MenuButton';
import ListItem from '@/components/utils/ListItem';
import Icon from '@/components/utils/Icon';
import { usePathname, useRouter } from 'next/navigation';
import Button from '@/components/utils/Button';
import Avatar from '@/components/utils/Avatar';
import { useContext } from 'react';
import { UserContext } from '@/client/contexts/user.context';

function Navbar() {
	const pathname = usePathname();
	const router = useRouter();

	const [user] = useContext(UserContext);

	const showBackButton = pathname === '/notifications';

	return (
		<Card
			className='fixed top-0 w-full z-40 p-0 rounded-none'
			bodyClassName='h-16 mx-auto px-2 flex justify-between items-center'
		>
			{showBackButton ? (
				<Button
					icon='arrow-left'
					iconClassName='size-8'
					onClick={() => router.back()}
				/>
			) : (
				<Link href='/' className='ml-2'>
					<Logo showText />
				</Link>
			)}

			<div className='flex'>
				{/* <Dropdown
					className='w-screen mt-1 fixed top-16 right-0 mx-2'
					closeOnClick
					trigger={
						<ListItem
							prefix={<Icon name='notification' />}
							allowEventPropagation
						/>
					}
				>
					<NotificationsList />
				</Dropdown> */}

				<ListItem
					prefix={
						<Avatar
							src='https://sporgates.com/upload/photos/d-avatar.jpg?cache=0'
							size={24}
						/>
					}
					href={`/users/${user?.id}`}
					selected={pathname === `/users/${user?.id}`}
				></ListItem>

				<MenuButton />

				{/* <div>
					{user === undefined ? null : user === null ? (
						<Link href='/sign-up'>
							<Button color='primary' className='uppercase font-semibold'>
								Join now !
							</Button>
						</Link>
					) : (
						<NavbarNavigation />
					)}
				</div> */}
			</div>
		</Card>
	);
}

export default Navbar;
