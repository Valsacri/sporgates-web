'use client';

import Card from '../utils/Card';
import Buttons from './Buttons';
import { usePathname } from 'next/navigation';

function PageNavigation() {
	const pathname = usePathname();

	return (
		<Card className='overflow-x-auto'>
			<Buttons
				stretch
				items={[
					{
						icon: 'gallery',
						text: 'Gallery',
						href: '/page/gallery',
						selected: pathname?.startsWith('/page/gallery'),
					},
					{
						icon: 'location',
						text: 'Grounds',
						href: '/page/grounds',
						selected: pathname?.startsWith('/page/grounds'),
					},
					{
						icon: 'two-user',
						text: 'Clubs',
						href: '',
						selected: pathname?.startsWith('/page/services'),
					},
				]}
			/>
		</Card>
	);
}

export default PageNavigation;
