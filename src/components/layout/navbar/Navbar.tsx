'use client';

import Link from 'next/link';
import Logo from '../../Logo';
import Card from '@/components/utils/Card';
import MenuButton from '../MenuButton';
import ListItem from '@/components/utils/ListItem';
import Icon from '@/components/utils/Icon';
import { usePathname, useRouter } from 'next/navigation';
import Button from '@/components/utils/Button';

function Navbar() {
	const pathname = usePathname();
	const router = useRouter();
	// const [user] = useContext(UserContext);
	const showBackButton = pathname === '/notifications';

	return (
		<Card className='fixed top-0 w-full z-40 p-0 rounded-none'>
			<div className='h-16 2xl:container mx-auto px-2 lg:px-16 flex justify-between items-center'>
				{showBackButton ? (
					<Button icon='arrow-left' iconClassName='size-8' onClick={() => router.back()} />
				) : (
					<Link href='/' className='ml-2'>
						<Logo />
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
						prefix={<Icon name='notification' />}
						href='/notifications'
						selected={pathname === '/notifications'}
					/>

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
			</div>
		</Card>
	);
}

export default Navbar;
