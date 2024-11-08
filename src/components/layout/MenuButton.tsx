'use client';

import Dropdown from '../utils/Dropdown';
import ListItem from '../utils/ListItem';
import Icon from '../utils/Icon';
import List2 from '../utils/List2';
import Separator from '../utils/Separator';
import { AuthClientService } from '@/client/services/auth.client-service';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { BreakpointContext } from '../../client/contexts/breakpoint.context';
import { useContext } from 'react';

function MenuButton({ showText = false }) {
	const router = useRouter();
	const breakpoint = useContext(BreakpointContext);

	return (
		<Dropdown
			closeOnClick
			xPosition={breakpoint?.isTablet ? 'right' : 'left'}
			yPosition={breakpoint?.isTablet ? 'bottom' : 'top'}
			className={twMerge('w-full', breakpoint?.isTablet && 'mt-3')}
			trigger={
				<ListItem
					prefix={
						<Icon
							name='menu2'
							className={twMerge(breakpoint?.isDesktop && 'scale-x-[-1]')}
						/>
					}
					allowEventPropagation
				>
					{showText && 'More'}
				</ListItem>
			}
		>
			<List2>
				<ListItem prefix={<Icon name='settings2' />} href='/settings'>
					Settings
				</ListItem>

				<ListItem prefix={<Icon name='flag' />} href='/businesses'>
					Businesses
				</ListItem>

				<ListItem
					suffix={
						<div className='rounded-full bg-secondary p-1 flex gap-1'>
							<Icon name='sun' className='bg-white p-1 rounded-full text-sm' />
							<Icon name='moon' className='p-1 rounded-full text-sm' />
						</div>
					}
				>
					Night mode
				</ListItem>

				<Separator />

				<ListItem
					prefix={<Icon name='turn-off' />}
					onClick={async () => {
						await AuthClientService.signOut();
						router.push('/sign-in');
					}}
				>
					Logout
				</ListItem>
			</List2>
		</Dropdown>
	);
}

export default MenuButton;
