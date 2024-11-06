'use client';

import Card from '@/components/utils/Card';
import NotificationsList from '../navbar/notification/NotificationsList';
import Separator from '@/components/utils/Separator';
import { useRef } from 'react';
import { useOutsideClick } from '@/client/hooks/utils/useOutsideClick';
import Search from '@/components/shared/Search';

interface Props {
	extension: string;
	onOutsideClick: () => any;
}

function SidebarExtension({ extension, onOutsideClick }: Props) {
	const ref = useRef(null);

	useOutsideClick(ref, onOutsideClick);

	return (
		<div ref={ref}>
			<Card
				title={<span className='uppercase ml-4'>{extension}</span>}
				className='h-full min-w-[400px] border-x bg-white px-2 py-6 rounded-none overflow-y-auto z-50'
        bodyClassName='pt-2'
			>
				{extension === 'notifications' ? (
					<NotificationsList />
				) : extension === 'search' ? (
					<Search />
				) : null}
			</Card>
		</div>
	);
}

export default SidebarExtension;
